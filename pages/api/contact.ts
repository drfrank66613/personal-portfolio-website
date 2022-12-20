// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type Data = {
  name: string;
  email: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Portfolio Web's Contact Form Submission`,
      text: `Name: ${name} | Email: ${email} | Message: ${message}`,
      html: `<h2>New Contact Form Submission Details</h2>
      <p><strong>Name: </strong> ${name}</p>
      <p><strong>Email: </strong> ${email}</p>
      <p><strong>Message: </strong> ${message}</p>`,
    });

    console.log("Message sent", mail.messageId);
  } catch (err) {
    console.log(err);
  }

  res.status(200).json(req.body);
}
