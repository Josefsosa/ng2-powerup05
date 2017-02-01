'use strict';

const path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    ignoreRules = require('./ignore.json');

let filesChecked = 0,
    jsonReport,
    qfilessucceeded = 0,
    qfilesfailed = 0;

function findFilesInDir(startPath, filter) {
    let results = [];
    if (!fs.existsSync(startPath)) {
        return;
    }

    let files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        let filename = path.join(startPath, files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            results = results.concat(findFilesInDir(filename, filter)); //recurse
        }
        else if (filename.indexOf(filter) >= 0) {
            filesChecked = filesChecked + 1;
            results.push(filename);
        }
    }
    return results;
};

function filterMessage(message) {
  return _.some(ignoreRules.attributes, (attr) => {
    return message.startsWith('Attribute “' + attr + '” not allowed on element');
  }) || _.some(ignoreRules.elements, (el) => {
    return message.startsWith('Element “' + el + '” not allowed as child of element');
  }) || _.some(ignoreRules.messages, (m) => {
    return message.startsWith(m);
  });
}

function filterFileMessages(jsonReport) {
  _.remove(jsonReport.messages, (message) => {
    return filterMessage(message.message);
  });
  return jsonReport;
}

function validateFiles(arrayFiles) {
    for (let i = 0, j = arrayFiles.length; i < j; i++) {
        jsonReport = JSON.parse(fs.readFileSync(arrayFiles[i]));
        jsonReport = filterFileMessages(jsonReport);
        for (let k = 0, l = jsonReport.messages.length; k < l; k++) {
            if (jsonReport.messages[k].type == 'error') {
                qfilesfailed = qfilesfailed + 1;
                break;
            } else {
                qfilessucceeded = qfilessucceeded + 1;
            }
        }
    }
};

function calculateScore(qualScore, error, finalSeverityObj) {
    let errorPer = { 'h': 0.4, 'm': 0.3, 'l': 0.2, 'vl': 0.1, 'H': 0.4, 'M': 0.3, 'L': 0.2, 'VL': 0.1 },
        score = qualScore - 1;

    if (error !== '') {
        if (finalSeverityObj[error] !== undefined) {
            score = score - errorPer[finalSeverityObj[error]];
        }
    }
    return score;
};

function findSeverityMessage(severityJson, severityMessage) {
    let index,
        key;
    for (key = 0; key < severityJson.length; key++) {
        if (severityJson[key].severityMessage == severityMessage) {
            index = key;
        } else {
            index = -1;
        }
    }

    return index;
}

function validateError(errorMessage) {
    return !filterMessage(errorMessage);
}

function createError(data, srnum, finalSeverityObj) {
    jsonReport = JSON.parse(fs.readFileSync(data));
    let fileError = {},
        errorsList = [],
        error = {},
        filePath = data.replace('report\\html-validator\\json', 'src'),
        errors = jsonReport,
        qualitativeScore = '',
        qualScore = 100,
        severityIndex;
    for (let i = 0, j = errors.messages.length; i < j; i++) {
        if (validateError(errors.messages[i].message)) {
            severityIndex = findSeverityMessage(finalSeverityObj, errors.messages[i].message);
            error = {
                index: srnum,
                htmlError: errors.messages[i].message,
                line: errors.messages[i].lastLine,
                col: errors.messages[i].firstColumn,
                severity: (severityIndex !== -1) ? finalSeverityObj[severityIndex].severityMessage : "NF",
                first: errorsList.length === 0
            };
            qualScore = calculateScore(qualScore, errors.messages[i].message, finalSeverityObj);

            errorsList.push(error);
        }
    }

    if (qualScore < 0) {
        qualScore = 0;
    }

    qualitativeScore += qualScore.toFixed(2);

    if (errorsList.length > 0) {
        fileError = {
            pathFile: filePath,
            score: qualitativeScore,
            rowspan: errorsList.length,
            errors: errorsList
        }
    } else {
        fileError = false;
    }
    return fileError;
};

function buildErrorJson() {
    let tmp = findFilesInDir('./report/html-validator/json', '.html'),
        errorJson = [],
        finalSeverityObj = JSON.parse(fs.readFileSync('./gulp/reports/html-validator/severity.json')),
        newError;
    validateFiles(tmp);

    for (let x = 0, y = tmp.length; x < y; x++) {
        newError = createError(tmp[x], x, finalSeverityObj);
        if (newError) {
            errorJson.push(newError);
        }
    }

    return {
        totalfailes: filesChecked,
        filesfiled: qfilesfailed,
        filessucceeded: qfilessucceeded,
        errors: errorJson
    };
}

function readData(cb) {
    cb(buildErrorJson());
}

function transformModel(data) {
    _.each(data.errors, function(error, index) {
        error.index = index + 1;
    });
    return data;
}

module.exports = function(cb) {
    readData((data) => {
        let model = transformModel(data);
        fs.readFile(path.join('gulp', 'reports', 'html-validator', 'template.html'), 'utf8', (err, source) => {
            let template = handlebars.compile(source, {}),
                html = template(model);
            fs.writeFile(path.join('report', 'html-validator', 'report.html'), html, () => {
                cb();
            });
        });
    });
};
