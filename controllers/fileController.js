var async = require('async');

var bizOps = require('../bizops/bizops');

const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.saveInfoToDb = (req, res, next) => {
    bizOps.saveInfoToDb(req, res, next);
}