import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

const options = {
  auth: {
    api_key: process.env.KEY,
  },
};

const client = nodemailer.createTransport(sgTransport(options));

// const client = nodemailer.createTransport({
//   service: "SendGrid",
//   auth: {
//     user: process.env.SENDMAILNAME,
//     pass: process.env.SENDMAILKEY,
//   },
// });

const email = {
  from: "fireking5997@kakao.com",
  to: "karolos5997@gmail.com",
  subject: "Hello",
  text: "Hello world",
  html: "<b>Hello world</b>",
};

client.sendMail(email, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log("Message sent");
  }
});
