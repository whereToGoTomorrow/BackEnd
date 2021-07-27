import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

const options = {
  auth: {
    api_key: process.env.MAILKEY,
  },
};

const client = nodemailer.createTransport(sgTransport(options));

const settingdMail = (to, text) => {
  const email = {
    from: process.env.MYMAIL,
    to: to,
    subject: "새로운 비밀번호 입니다.",
    text,
    html: `<h1>${text}</h1>`,
  };

  return email;
};

export const sendMail = (to, text) => {
  client.sendMail(settingdMail(to, text), function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent");
    }
  });
};
