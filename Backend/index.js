const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors")
const getPDF = require("./generatePDF")
const jwt = require('jsonwebtoken')

// middlewares
const checkRegistered = require("./middlewares/checkRegistered")
const isAuth = require('./middlewares/isAuth')
//

const models = require("./dbModels");

const app = express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', isAuth, (req, res) => {
    res.send("Welcome to this API")
})




// ----------REGISTER NEW USER---------

app.post('/register', checkRegistered, (req, res) => {
    const secretKey = "doItOrRegretIt";
    var newClient = new models.clientDetails({
        GSTIN: req.body.GSTIN,
        tradeName: req.body.tradeName,
        representative: req.body.representative,
        address: req.body.address,
        contactInfo: {
            mobileNo: req.body.contactInfo.mobileNo,
            email: req.body.contactInfo.email
        },
        password: req.body.password
    })

    newClient.save().then(() => {
        res.status(200).json({
            message: "Successfully Registered",
            "auth-token": jwt.sign(req.body.GSTIN, secretKey),
        })
    }).catch(err => {
        res.status(400).json({
            error: err,
            message: "Error Occurred, Try again later"
        })
    })
})

app.post("/login", async (req, res) => {
    // console.log(req.body);
    const secretKey = "doItOrRegretIt";
    var result = await models.clientDetails.findOne({ GSTIN: req.body.GSTIN })
    // console.log(result._id);
    // console.log(result._id.toString());
    // console.log(req.body.password);
    if (!result) {
        res.status(404).json({
            message: "User does not exists"
        })
    }
    else {
        if (result.password === req.body.password) {
            res.json({
                "auth-token": jwt.sign(result.GSTIN, secretKey),
                message:"Successfully Logged In"
            })
        }
        else {
            res.status(401).json({
                message: "Invalid Login Credentials"
            })
        }
    }


})



// -------------CREATE INVOICE-------------------
app.post("/newinvoice", isAuth, (req, res) => {  
    var body = {
        clientGSTIN: req.body.clientGSTIN.toUpperCase(),
        tradeName: req.body.tradeName.toUpperCase(),
        address: req.body.address,
        products: req.body.products,
        gstRate: req.body.gstRate,

        date: new Date(),
        invoiceId: crypto.randomBytes(7).toString('hex').toUpperCase()
    }
    var record = new models.modelInvoice(req.GSTIN)(body)     // gstin to _id ?

    record.save().then(() => {
        var pdf = getPDF(body)
        res.status(200)
        pdf.pipe(res)

    }).catch(err => {
        res.status(400).json({
            message: "Error Occured, Please Try Again Later"
        })
    })

})


// -----------SEARCHING RECORDS------------

//  authentication?
app.get('/search',isAuth, async (req, res) => {
    var result = [];

    // console.log(typeof req.query.gstin);
    // console.log(typeof req.query.invoiceno);
    try {

        if (req.query.method === "date") {
            result = await models.modelInvoice(req.GSTIN).find({ [req.query.method]: { $gte: req.query.date_from, $lte: req.query.date_to } });
        }
        else {
            result = await models.modelInvoice(req.GSTIN).find({ [req.query.method]: req.query.value });
        }


        res.json(result);
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }



})





app.listen(80, () => {
    console.log("Started");
})