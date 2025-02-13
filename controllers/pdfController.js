//Expected request body

/* {
    [
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
    {
      "id": "6b558e8a-6d64-4e2a-a80d-6fdf476475a8",
      "checkoutRequestID": "ws_CO_03022025094021630704500346",
      "phoneNumber": "254704500346",
      "fullName": "Tirus Tendwa",
      "email": "tirus301@outlook.com",
      "amount": 1,
      "date": "2025-02-03T06:40:21.464Z",
      "typeId": 7,
      "status": "PENDING"
    },
    {
      "id": "1b2d5af0-dfca-45fd-ab70-0ce3b50f3346",
      "checkoutRequestID": "ws_CO_03022025094021630704500346",
      "phoneNumber": "254704500346",
      "fullName": "Tirus Tendwa",
      "email": "tirus301@outlook.com",
      "amount": 1,
      "date": "2025-02-03T06:40:21.463Z",
      "typeId": 5,
      "status": "PENDING"
    },
    {
      "id": "f85ccd8e-c593-404b-b0d0-3ec397993cfc",
      "checkoutRequestID": "ws_CO_03022025094021630704500346",
      "phoneNumber": "254704500346",
      "fullName": "Tirus Tendwa",
      "email": "tirus301@outlook.com",
      "amount": 1,
      "date": "2025-02-03T06:40:21.461Z",
      "typeId": 3,
      "status": "PENDING"
    },
    {
      "id": "15da5d19-34e4-45aa-9027-7b5c8605c2a1",
      "checkoutRequestID": "ws_CO_03022025094021630704500346",
      "phoneNumber": "254704500346",
      "fullName": "Tirus Tendwa",
      "email": "tirus301@outlook.com",
      "amount": 1,
      "date": "2025-02-03T06:40:21.454Z",
      "typeId": 1,
      "status": "PENDING"
    }
]
} */

const PDFDocument = require("pdfkit");
const fs = require("fs");
const generatePDF = require("../lib/generatePDF");
const { sendMail, sendFailedEmail } = require("../lib/mail");

exports.createPdf = async (req, res) => {
  try {
    // Create a pdf document and return it to the client
    const reqBod = req.body;
    console.log("Request body: ", reqBod);

    if (reqBod.success === false) {
      const sendEmail = await sendFailedEmail(
        reqBod.user.email,
        "Transaction Report",
        "Failed to create PDF"
      );
      if (sendEmail instanceof Error) {
        throw sendEmail;
      }
      return res.status(200).json({
        data: sendEmail.messageId,
        message: "Failed to create PDF",
        success: false,
      });
    }

    const pdf = await generatePDF(reqBod.transactions, reqBod.user);
    if (pdf instanceof Error) {
      throw pdf;
    }
    const sendEmail = await sendMail(
      reqBod.user.email,
      "Transaction Report",
      "Please find attached your transaction report",
      pdf
    );
    if (sendEmail instanceof Error) {
      throw sendEmail;
    }
    return res.status(200).json({
      data: sendEmail.messageId,
      message: "PDF created and sent successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in createPdf controller: ", error);
    return res
      .status(500)
      .json({ data: null, message: "Internal server error", success: false });
  }
};
