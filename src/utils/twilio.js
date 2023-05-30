import twilio from "twilio";
import { twilio as twilioConfig  } from "../config.js";

// Twilio Credentials
const {accountSid, authToken, clientNumber, clientWhatsAppNumber, twilioNumber, twilioWhatsAppNumber} = twilioConfig;

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