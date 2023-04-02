import twilio from "twilio";
import {config} from 'dotenv'
config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const clientNumber = process.env.FAKE_CLIENT_NUMBER;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const clientWhatsAppNumber = process.env.FAKE_CLIENT_WHATSAPP_NUMBER;

const client = twilio(accountSid, authToken);

export const message = {
    body: "",
    from: twilioNumber,
    to: clientNumber
}

export const whatsAppMessage = {
    body: "",
    from: twilioWhatsAppNumber,
    to: clientWhatsAppNumber
}

export default client;