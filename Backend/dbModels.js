const mongoose = require("mongoose");


// Connecting to MongoDB database
mongoose.connect("mongodb://127.0.0.1/billing-app")



var clientDetails_schema = new mongoose.Schema({
    GSTIN: {
        type: String,
        uppercase: true,
        required: true
    },
    tradeName: { type: String, required: true },
    representative: { type: String, required: true },
    address: { type: String, required: true },
    contactInfo: {
        mobileNo: { type: String, required: true },
        email: {
            type: String,
            required: true
        }
    },
    password: { type: String, required: true },
})
var clientDetails = mongoose.model('client-details', clientDetails_schema)


var invoice_schema = new mongoose.Schema({
    clientGSTIN: {
        type: String,
        uppercase: true,
        minLength: 5   // 15(actually) | 5 for dev. purpose
    },
    tradeName: {
        type: String,
        uppercase: true
    },
    address: String,
    date: Date,
    products: [
        {
            name: String,
            hsnc: Number,
            qty: Number,
            rate: Number
        }
    ],
    gstRate: Number,
    invoiceId: String


})
function modelInvoice(gstin) {
    return mongoose.model(gstin, invoice_schema)
}

module.exports = { clientDetails, modelInvoice };

