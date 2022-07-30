const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Clothes = require('../models/clothes');

const clothRouter = express.Router();

clothRouter.use(bodyParser.json());

clothRouter.route('/')
    .get((req, res, next) => {
        Clothes.find(req.query)
            .populate('comments.author')
            .then((clothes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(clothes);
            }, (err) => next(err))
    .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Clothes.create(req.body)
            .then((cloth) => {
                console.log('Cloth Created ', cloth);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cloth);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /clothes');
    })
    .delete((req, res, next) => {
        Clothes.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
        .catch((err) => next(err));
    });

clothRouter.route('/:clothId')
    .get((req, res, next) => {
        Clothes.findById(req.params.clothId)
            .populate('comments.author')
            .then((cloth) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cloth);
            }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /clothes/' + req.params.clothId);
    })
    .put((req, res, next) => {
        Clothes.findByIdAndUpdate(req.params.clothId, {
            $set: req.body
        }, { new: true })
            .then((cloth) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cloth);
            }, (err) => next(err))
         .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Clothes.findByIdAndRemove(req.params.clothId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
    .catch((err) => next(err));
    });

module.exports = clothRouter;