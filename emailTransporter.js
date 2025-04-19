import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "vicbolt.madrid@gmail.com",
    pass: "nqai qdfz uaqx opat",
  },
});

export default transporter;