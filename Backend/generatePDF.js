const PDFDocument = require('pdfkit');
const fs = require('fs');
// 

// 
function generateInvoicePDF(rec) {

    const doc = new PDFDocument({ margin: 50, size: "A4" });

    // 

    // Add Business logo
    doc.image('logo.jpg', 40, 15, { width: 100 });

    // Title
    doc
        .fontSize(17)
        .text('TAX INVOICE', 50, 50, { align: 'right' })
        .moveDown();

    // Recipient
    doc
        .fontSize(12)
        .text('Recipient', 50, 125, { underline: true })
        .fontSize(10)
        .text(rec.tradeName, doc.x, doc.y + 10)
        // .text("_address_", { width: 250 })
        .text(`GSTIN: ${rec.clientGSTIN} `, doc.x, doc.y + 6)
    // 
    var l = doc.y + 30
    var temp = (l + 40) + (15.56 * rec.products.length) + 18


    doc.fontSize(11)
    doc.text('Date:', 400, 125).moveUp()
        .text(rec.date.toLocaleDateString(), 440, doc.y, { width: 105, align: 'right' })
        .text('Invoice No:', 372, doc.y).moveUp()
        .text(rec.invoiceId, 440, doc.y, { width: 105, align: 'right' })


    doc
        .fontSize(12).moveDown()
        .text('Order Summary', 50, l, { underline: true })
        .moveDown();


    doc.fontSize(10)
    doc.text('Description', { width: 100, align: 'right' }).moveUp()
    doc.text('Qty', 320, doc.y).moveUp()
    doc.text('Rate', 380, doc.y).moveUp()
    doc.text('Amount', 470, doc.y).moveDown()
    doc.text("", 50, doc.y)
    // 
    // //   /// //  /// //  /// /// /
    var subTotal = 0
    rec.products.forEach(i => {
        doc.text(i.name, 50, doc.y, { width: 240, align: 'left', lineGap: 1 }).moveUp()
            .text(i.qty, 300, doc.y, { width: 59, align: 'right', lineGap: 1 }).moveUp()
            .text(i.rate, 360, doc.y, { width: 68, align: 'right', lineGap: 1 }).moveUp()
            .text((i.qty * i.rate).toFixed(2), 435, doc.y, { width: 90, align: 'right', lineGap: 1 })
        subTotal += i.qty * i.rate;
    })

    //  //  //  //  /////   //  ////

    // 
    doc.text("Sub Total", 348, temp + 5, { width: 80, align: 'right', lineGap: 1 }).moveUp()
    doc.text(subTotal.toFixed(2), 435, doc.y, { width: 90, align: 'right', lineGap: 1 })
    doc.text(`CGST (${rec.gstRate}%)`, 348, doc.y, { width: 80, align: 'right', lineGap: 1 }).moveUp()
    doc.text(((rec.gstRate / 200) * subTotal).toFixed(2), 435, doc.y, { width: 90, align: 'right', lineGap: 1 })
    doc.text(`SGST (${rec.gstRate}%)`, 348, doc.y, { width: 80, align: 'right', lineGap: 1 }).moveUp()
    doc.text(((rec.gstRate / 200) * subTotal).toFixed(2), 435, doc.y, { width: 90, align: 'right', lineGap: 1 })
    doc.text("Grand TOTAL", 348, doc.y + 2, { width: 80, align: 'right', lineGap: 1 }).moveUp()
    doc.text(((1 + (rec.gstRate / 100)) * subTotal).toFixed(2), 435, doc.y, { width: 90, align: 'right', lineGap: 1 })

    // bottom
    // Horizontal Line
    doc.lineWidth(0.5)
        .lineCap('butt')
        .moveTo(50, l + 40)
        .lineTo(545, l + 40)
        .stroke();

    // 
    doc.lineWidth(0.5)
        .lineCap('butt')
        .moveTo(300, l + 25)
        .lineTo(300, temp)
        .stroke();
    // 
    doc.lineWidth(0.5)
        .lineCap('butt')
        .moveTo(360, l + 25)
        .lineTo(360, temp)
        .stroke();
    // 
    doc.lineWidth(0.5)
        .lineCap('butt')
        .moveTo(430, l + 25)
        .lineTo(430, temp)
        .stroke();
    doc.lineWidth(0.5)
        .lineCap('butt')
        .moveTo(430, temp)
        .lineTo(430, temp + 65)
        .stroke();


    // bottom horizontal line
    doc.lineWidth(0.5)
        .lineCap('butt')
        .moveTo(50, temp)
        .lineTo(545, temp)
        .stroke();

    // 
    // grandTotal_Line
    doc.lineWidth(1)
        .lineCap('butt')
        .moveTo(360, doc.y - 17)
        .lineTo(545, doc.y - 17)
        .stroke();


    doc.text("This Invoice is Computer generated. Hence, doesn't require Signature", 50, 780, { align: 'center' })
    doc.end();
    return doc;
}

module.exports = generateInvoicePDF;