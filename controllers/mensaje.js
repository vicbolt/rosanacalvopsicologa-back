"use strict";

import validator from "validator";
import nodemailer from "nodemailer";

// Configuración del transportador SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "vegagiordannogarcia@gmail.com",
    pass: "yknb msay izaa ybmq",
  },
});

import Mensaje from "../models/mensaje.js";

const MensajeController = {
  getMsg: (req, res) => {
    Mensaje.find()
      .sort("-id")
      .exec()
      .then((mensajes) => {
        if (mensajes.length > 0) {
          return res.status(200).send({
            status: "Success",
            mensajes,
          });
        } else {
          return res.status(404).send({
            status: "Error",
            msg: "Error al encontrar los datos",
          });
        }
      })

      .catch((err) => {
        return res.status(500).send({
          status: "Error",
          msg: "Fallo al buscar los mensajes",
        });
      });
  },

  saveMsg: (req, res) => {
    //RECOGEMOS LOS PARAMETROS DEL POST
    var params = req.body;

    //VALIDAMOS LOS DATOS
    try {
      var validator_name = !validator.isEmpty(params.name);
      var validator_email = !validator.isEmpty(params.email);
      var validator_comPreference = !validator.isEmpty(params.comPreference);
      var validator_time = !validator.isEmpty(params.time);
      
      var validator_phone = !validator.isEmpty(params.phone);
      var validator_msg = !validator.isEmpty(params.msg);
    } catch (err) {
      return res.status(400).send({
        status: "Error de validación",
        msg: "No se han podido validar los datos del formulario",
      });
    }

    //SI LA VALIDACIÓN ES CORRECTA
    if (
      validator_name &&
      validator_email &&
      validator_comPreference &&
      validator_time &&
      validator_phone &&
      validator_msg
    ) {
      var mensaje = new Mensaje();

      mensaje.name = params.name;
      mensaje.email = params.email;
      mensaje.comPreference = params.comPreference;
      mensaje.time = params.time;
      mensaje.phone = params.phone;
      mensaje.msg = params.msg;

      mensaje
        .save()
        .then(() => {
          const mailOptions = {
            from: "vegagiordannogarcia@gmail.com",
            to: "vegagiordannogarcia@gmail.com",
            subject: "Nuevo formulario recibido",
            html: `
            <div style="background-color: rgba(143, 125, 211, 0.25); padding: 20px; border-radius: 10px; font-family: Arial, sans-serif; color: #333333;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="text-align: center;">
                    <img src="https://i.postimg.cc/5y6KJxhs/main-logo.png" alt="Logo" width="150" style="display: block; margin: 0 auto;">
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; background-color: #ffffff; border-radius: 10px;">
                    <h1 style="color: #4e4e4e; font-size: 24px; margin-bottom: 10px;">¡Hola Rosana!</h1>
                    <p style="font-size: 16px;">Te informamos que has recibido un nuevo mensaje desde la página web:</p>
                    <ul style="list-style-type: none; padding: 0; margin-top: 10px;">
                      <li style="margin-bottom: 10px;"><strong>Nombre:</strong> ${mensaje.name}</li>
                      <li style="margin-bottom: 10px;"><strong>Email:</strong> ${mensaje.email}</li>
                      <li style="margin-bottom: 10px;"><strong>Preferencia de comunicación:</strong> ${mensaje.comPreference}</li>
                      <li style="margin-bottom: 10px;"><strong>Franja Horaria:</strong> ${mensaje.time}</li>
                      <li style="margin-bottom: 10px;"><strong>Teléfono:</strong> ${mensaje.phone}</li>
                      <li style="margin-bottom: 10px;"><strong>Mensaje:</strong> ${mensaje.msg}</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
            `,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            console.log("Entra");
            if (error) {
              console.error("Error al enviar el correo electrónico:", error);
            } else {
              console.log("Correo electrónico enviado:", info.response);
            }
          });

          const mailOptions2 = {
            from: "vegagiordannogarcia@gmail.com",
            to: mensaje.email,
            subject: "Gracias por contactar con Rosana Calvo",
            html: `
            <html lang="es">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Correo de Agradecimiento</title>
              </head>
              <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: rgba(143, 125, 211, 0.25);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding: 20px 0; text-align: center;">
                      <img src="https://i.postimg.cc/5y6KJxhs/main-logo.png" alt="Logo" width="150" height="auto" style="display: block; margin: 0 auto;">
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px; background-color: #ffffff; border-radius: 10px;">
                      <h2 style="color: #333333; text-align: start;">¡Gracias por ponerte en contacto!</h2>
                      <p style="color: #333333; text-align: start;">Estimado/a ${mensaje.name},</p>
                      <p style="color: #333333; text-align: justify;">Quiero agradecerte sinceramente por haberte puesto en contacto conmigo. Como profesional de la salud mental, tu bienestar es mi prioridad, y estoy comprometido/a a proporcionarte un espacio seguro y de apoyo donde puedas explorar tus pensamientos y emociones de manera constructiva.</p>
                      <p style="color: #333333; text-align: justify;">Revisaré tu mensaje con la máxima confidencialidad y me pondré en contacto contigo lo antes posible para entender cómo puedo ayudarte mejor en tu camino hacia el bienestar emocional.</p>
                      <p style="color: #333333; text-align: center;">Atentamente,<br>Rosana</p>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
            `,
          };

          transporter.sendMail(mailOptions2, (error, info) => {
            console.log("Entra");
            if (error) {
              console.error("Error al enviar el correo electrónico:", error);
            } else {
              console.log("Correo electrónico enviado:", info.response);
            }
          });

          return res.status(200).send({
            status: "Success",
            msg: "Se ha guardado en la base de datos",
            mensaje
          });
        })

        .catch((err) => {
          return res.status(400).send({
            status: "Error",
            msg: "ERROR. No se ha guardado en la base de datos",
          });
        });
    }
  },
};

export const { saveMsg, getMsg } = MensajeController;
