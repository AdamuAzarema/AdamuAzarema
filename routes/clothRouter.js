const express = require('express');
const bodyParser = require('body-parser');

const clothRouter = express.Router();

clothRouter.use(bodyParser.json());

clothRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the clothes to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the cloth: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /clothes');
    })
    .delete((req, res, next) => {
        res.end('Deleting all clothes');
    });

clothRouter.route('/:clothId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send details of the cloth: ' + req.params.clothId + ' to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the cloth: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.write('Updating the cloth: ' + req.params.clothId);
        res.end('Will update the cloth: ' + req.body.name +
            ' with details: ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting cloth: ' + req.params.clothId);
    });

module.exports = clothRouter;