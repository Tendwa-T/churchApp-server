// Data example
/*  [
    {
      "id": "7fef66e1-02c5-4d59-800a-b417072b8c28",
      "checkoutRequestID": "ws_CO_03022025094438195704500346",
      "phoneNumber": "254704500346",
      "fullName": "Tirus Tendwa",
      "email": "tirus301@outlook.com",
      "amount": 1,
      "date": "2025-02-03T06:44:38.037Z",
      "typeId": 1,
      "status": "PENDING"
    },
    {
      "id": "6de89745-1049-4c60-bd01-453277bc85f4",
      "checkoutRequestID": "ws_CO_03022025094021630704500346",
      "phoneNumber": "254704500346",
      "fullName": "Tirus Tendwa",
      "email": "tirus301@outlook.com",
      "amount": 1,
      "date": "2025-02-03T06:40:21.466Z",
      "typeId": 9,
      "status": "PENDING"
     },
 ] */

var initialData = [
  { id: 1, "Transaction Type": "Tithe" },
  { id: 2, "Transaction Type": "Local Church Budget" },
  { id: 3, "Transaction Type": "Conference Offering 5%" },
  { id: 4, "Transaction Type": "Evangelism - Local" },
  { id: 5, "Transaction Type": "Evangelism - Conference" },
  { id: 6, "Transaction Type": "Camp meeting Offerings" },
  { id: 7, "Transaction Type": "Camp meeting Expenses" },
  { id: 8, "Transaction Type": "Thanksgiving / Birthday" },
  { id: 9, "Transaction Type": "Building / Development funds" },
  { id: 10, "Transaction Type": "Good Samaritan" },
];

const PDFDocument = require("pdfkit");

async function generatePDF(data, user) {
  console.log("Data from GeneratePDF: ", data);
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.fontSize(18).text("Transaction Receipt", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`User: ${user.fullName}`);
    doc.text(`Phone: ${user.phoneNumber}`);
    doc.text(`Email: ${user.email}`);
    doc.moveDown();

    doc.fontSize(12).text("Transactions:", { underline: true });
    let totalAmount = 0;
    data.forEach((txn, index) => {
      if (doc.y > 700) doc.addPage(); // Add new page if needed
      doc.moveDown(0.5);
      doc.text(`${index + 1}. Date: ${new Date(txn.date).toLocaleString()}`);
      doc.text(`   Amount: KES ${txn.amount}`);
      doc.text(`   Status: ${txn.status}`);
      totalAmount += txn.amount;
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total Amount: KES ${totalAmount}`, { bold: true });
    doc.moveDown();
    doc.text("Thank you for your transaction!", { align: "center" });
    doc.end();
  });
}

module.exports = generatePDF;
