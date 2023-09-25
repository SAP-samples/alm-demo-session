class ScopeCheck {

    constructor() {
        this.router = require('express').Router();
    }

    getRouter() {
        return this.router;
    }

    checkAuthorization(req, res, next) {
        res.send(true);

        // const isAuthorized = req.authInfo.checkLocalScope('A2AAdmin') || req.authInfo.checkLocalScope('A2ADisplay');
        // console.log("check authorization admin result: ", req.authInfo.checkLocalScope('A2AAdmin'));
        // console.log("check authorization display result: ", req.authInfo.checkLocalScope('A2ADisplay'));
        // if (!isAuthorized) {
        //     const error = new Error('Unauthorized');
        //     error.status = 401;
        //     return next(error);
        // }
        // res.send(true);
    }
    checkA2AAdmin(req, res, next) {
        if (!req.authInfo.checkLocalScope('A2AAdmin')) {
            res.locals.status = 403;
            const err = new Error('Forbidden');
            err.status = 403;
            next(err);
        }

    }

    checkA2ADisplay(req, res, next) {
        if (!req.authInfo.checkLocalScope('A2ADisplay')) {
            res.locals.status = 403;
            const err = new Error('Forbidden');
            err.status = 403;
            next(err);
        }
    }


    printNotAllowed(res) {
        res.send("Only Admins are allowed");
    }

    // module.exports = {
    //     checkAuthorization,
    //     A2AAdmin,
    //     A2ADisplay,
    //     scopeVerify,
    //     printNotAllowed
    // };
}
module.exports = new ScopeCheck();