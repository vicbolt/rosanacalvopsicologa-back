"use strict";

import validator from "validator"; 
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

var UserController = {

  register: async (req, res) => {
    // RECOGER LOS DATOS DEL USUARIO
    var params = req.body;

    // VALIDAR LOS DATOS
    try {
      var validator_name = !validator.isEmpty(params.name);
      var validator_username = !validator.isEmpty(params.username);
      var validator_password = !validator.isEmpty(params.password);
    } catch (err) {
      return res.status(400).send({
        msg: "Faltan datos por enviar",
      });
    }

    // SI LA VALIDACIÓN ES CORRECTA
    if (validator_name && validator_username && validator_password) {
      // CREAR OBJETO DE USUARIO
      var user = new User();

      // ASIGNAR VALORES AL USUARIO
      user.name = params.name;
      user.username = params.username;

      // ENCRIPTAR CONTRASEÑA
      user.password = await bcrypt.hash(params.password, 10);

      // GUARDAR USUARIO
      user
        .save()
        .then(() => {
          return res.status(200).send({
            msg: "Usuario registrado correctamente",
            user,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            msg: "Error al guardar el usuario",
            err,
          });
        });
    } else {
      return res.status(400).send({
        msg: "Validación de los datos incorrecta",
      });
    }
  },

  login: async (req, res) => {
    // RECOGER LOS DATOS DEL USUARIO
    var params = req.body;
    console.log("Cuerpo de la petición:", params);

    // VALIDAR LOS DATOS
    try {
      var validator_username = !validator.isEmpty(params.username);
      var validator_password = !validator.isEmpty(params.password);
    } catch (err) {
      return res.status(400).send({
        msg: "Faltan datos por enviar",
      });
    }

    if (validator_username && validator_password) {
      // BUSCAR usernames QUE COINCIDAN CON EL username
      User.findOne({ username: params.username })
        .then(async (user) => {
          if (!user) {
            return res.status(404).send({
              msg: "Usuario no encontrado",
            });
          } else {
            // COMPROBAR SI LA password ES CORRECTA
            var pwd = await bcrypt.compare(params.password, user.password);
            if (pwd) {
              // GENERAR TOKEN JWT
              const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

              // DEVOLVER DATOS DEL USUARIO Y TOKEN
              return res.status(200).send({
                msg: "Usuario identificado correctamente",
                user,
                token, // Enviar el token al frontend
              });
            } else {
              return res.status(401).send({
                msg: "Contraseña incorrecta",
              });
            }
          }
        })
        .catch((err) => {
          console.error('Error al identificar el usuario:', err);
          return res.status(500).send({
            msg: "Error al identificar el usuario",
            err,
          });
        });
    } else {
      return res.status(400).send({
        msg: "Validación de los datos incorrecta",
      });
    }
  },
};

export default UserController;
