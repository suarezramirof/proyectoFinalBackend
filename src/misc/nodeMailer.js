import {createTransport} from 'nodemailer';
import {config} from "dotenv";
config();
const mail = process.env.MAIL_ADDRESS;

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: mail,
        pass: process.env.MAIL_PASS
    }
})

export const registerMail = {
    from: "Servidor Node.js",
    to: mail,
    subject: "Nuevo registro",
    html: ""
}

export const orderMail = {
    from: "Servidor Node.js",
    to: mail,
    subject: "Nuevo pedido de ",
    html: []
}

export default transporter;