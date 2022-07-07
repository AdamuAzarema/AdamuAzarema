const express = require('express');
const bodyParser = require('body-parser');


const customerRouter = express.Router();

customerRouter.use(bodyParser.json());

customerRouter.route('/')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the customers to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the customer: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /customers');
    })
    .delete((req, res, next) => {
        res.end('Deleting all customers');
    });

customerRouter.route('/:customerId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send details of the customer: ' + req.params.customerId + ' to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the customer: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.write('Updating the customer: ' + req.params.customerId);
        res.end(' Will update the customer: ' + req.body.name +
            ' with details: ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting customer: ' + req.params.customerId);
    });

module.exports = customerRouter;