"use strict";

const nodeCache = require('node-cache');

let cache = null;

exports.start = function (done) {
    if (cache) { return done() };
    console.log("distributor cache initialized");
    cache = new nodeCache();
};

exports.instance = function () {
    return cache;
};