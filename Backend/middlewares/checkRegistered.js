const models = require('../dbModels')

async function checkRegistered(req, res, next) {
    var result = await models.clientDetails.find({ GSTIN: req.body.GSTIN })
    if (result.length !== 0) {
        res.status(400).json({
            message: "GSTIN Already Registered"
        })
        return;
    }
    next();
}


module.exports = checkRegistered;