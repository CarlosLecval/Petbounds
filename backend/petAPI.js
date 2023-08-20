const { DataSource } = require("apollo-datasource");
const { Op } = require("sequelize");
const isEmail = require("isemail");

class PetAPI extends DataSource {
  constructor({ store, mongoStore, transporter }) {
    super();
    this.store = store;
    this.mongoStore = mongoStore;
    this.transporter = transporter;
  }

  initialize(config) {
    this.context = config.context;
  }

  async mostrarMascotasFeed() {
    const mascotas = await this.store.mascota.findAll({
      include: this.store.organizacion,
    });
    return mascotas;
  }

  async mostrarServiciosFeed() {
    const servicios = await this.store.servicio.findAll({
      include: this.store.prestador,
    });
    return servicios;
  }

  async mostrarUsuario(id) {
    const id_usu =
      this.context && this.context.usuario ? this.context.usuario.id : id;
    const usuario = await this.store.usuario.findByPk(id_usu);
    return usuario;
  }

  async mostrarOrg(id) {
    const id_org =
      this.context && this.context.organizacion
        ? this.context.organizacion.id
        : id;
    const usuario = await this.store.organizacion.findByPk(id_org);
    return usuario;
  }

  async mostrarPrest(id) {
    const id_prest =
      this.context && this.context.prestador ? this.context.prestador.id : id;
    const usuario = await this.store.prestador.findByPk(id_prest);
    return usuario;
  }

  async servicioSeleccionado(id) {
    const infoServ = await this.store.servicio.findByPk(id, {
      include: [this.store.cita, this.store.prestador],
    });
    console.log(infoServ);
    return infoServ;
  }

  async mascotaSeleccionada(id) {
    const mascota = await this.store.mascota.findByPk(id, {
      include: this.store.organizacion,
    });
    return mascota;
  }

  async mascotaOrganizacion(id) {
    const id_org =
      this.context && this.context.organizacion
        ? this.context.organizacion.id
        : id;
    const mascota = await this.store.mascota.findAll({
      where: { organizacionId: id_org },
      include: this.store.organizacion,
    });
    return mascota;
  }

  async serviciosPrestador(id) {
    const id_prest =
      this.context && this.context.prestador ? this.context.prestador.id : id;
    const servicios = await this.store.servicio.findAll({
      where: { prestadorId: id_prest },
      include: this.store.prestador,
    });
    return servicios;
  }

  async solicitudesOrganizacion(id) {
    const id_org =
      this.context && this.context.organizacion
        ? this.context.organizacion.id
        : id;
    const solicitudes = await this.store.solicitud.findAll({
      where: { "$mascota.organizacionId$": id_org },
      include: [
        {
          model: this.store.mascota,
          as: "mascota",
          include: [this.store.organizacion],
        },
        this.store.usuario,
      ],
    });
    console.log(solicitudes);
    return solicitudes;
  }

  async solicitudesUsuario(id) {
    const id_usu =
      this.context && this.context.usuario ? this.context.usuario.id : id;
    const solicitudes = await this.store.solicitud.findAll({
      where: { usuarioId: id_usu },
      include: [
        {
          model: this.store.mascota,
          as: "mascota",
          include: [this.store.organizacion],
        },
        this.store.usuario,
      ],
    });
    return solicitudes;
  }

  async favoritosUsuario(id) {
    const id_usu =
      this.context && this.context.usuario ? this.context.usuario.id : id;
    const favorito = await this.store.favorito.findAll({
      where: { usuarioId: id_usu },
      include: [
        {
          model: this.store.mascota,
          as: "mascotaFav",
          include: [this.store.organizacion],
        },
        this.store.usuario,
      ],
    });
    return favorito;
  }

  async solicitudSeleccionada(id) {
    const solicitudes = await this.store.solicitud.findByPk(id, {
      include: [
        {
          model: this.store.mascota,
          as: "mascota",
          include: [this.store.organizacion],
        },
        this.store.usuario,
      ],
    });
    return solicitudes;
  }

  async citasPrestador(id) {
    const id_prest =
      this.context && this.context.prestador ? this.context.prestador.id : id;
    const citas = await this.store.usuariocita.findAll({
      where: { "$cita.servicio.prestadorId$": id_prest },
      include: [
        this.store.usuario,
        {
          model: this.store.cita,
          as: "cita",
          include: [
            { model: this.store.servicio, include: [this.store.prestador] },
          ],
        },
      ],
    });
    return citas;
  }

  async citasUsuario(id) {
    const id_usu =
      this.context && this.context.usuario ? this.context.usuario.id : id;
    const citas = await this.store.usuariocita.findAll({
      where: { usuarioId: id_usu },
      include: [
        this.store.usuario,
        {
          model: this.store.cita,
          as: "cita",
          include: [
            { model: this.store.servicio, include: [this.store.prestador] },
          ],
        },
      ],
    });
    return citas;
  }

  async consultaMensajes(solicitudId) {
    const men = await this.mongoStore.mensaje.find({
      solicitudId: solicitudId,
    });
    return men;
  }

  async inicioSesion(correo, contra) {
    const org = await this.store.organizacion.findOne({
      where: { correo: correo },
    });
    if (org === null) {
      const prest = await this.store.prestador.findOne({
        where: { correo: correo },
      });
      if (prest === null) {
        const usuario = await this.store.usuario.findOne({
          where: { correo: correo },
        });
        if (usuario != null) {
          if (usuario.contra === contra) {
            return {
              id: usuario.id,
              cuenta: "usuario",
              validacion: true,
            };
          } else {
            return false;
          }
        } else {
          return null;
        }
      } else {
        if (prest.contra === contra) {
          return {
            id: prest.id,
            cuenta: "prest",
            validacion: prest.validacion,
          };
        } else {
          return false;
        }
      }
    } else {
      if (org.contra === contra) {
        return {
          id: org.id,
          cuenta: "org",
          validacion: org.validacion,
        };
      } else {
        return false;
      }
    }
  }

  async registroUsuario(
    correo,
    contra,
    nombre,
    apellidop,
    apellidom,
    nickname,
    nacimiento,
    genero
  ) {
    if (!isEmail.validate(correo)) return null;
    const org = await this.store.organizacion.findOne({
      where: { correo: correo },
    });
    if (org === null) {
      const prest = await this.store.prestador.findOne({
        where: { correo: correo },
      });
      if (prest === null) {
        const [usuario, created] = await this.store.usuario.findOrCreate({
          where: { correo: correo },
          defaults: {
            contra: contra,
            nombre: nombre,
            apellidop: apellidop,
            apellidom: apellidom,
            nickname: nickname,
            nacimiento: nacimiento,
            genero: genero,
          },
        });
        if (created) {
          var info = await this.transporter.sendMail({
            from: '"Petbounds" <noreply@petbounds.tech>',
            to: `${correo}, ${correo}`,
            subject: "¡Verifica tu correo! ✔",
            text: "Gracias por registrarte en Petbounds, da el siguiente paso y verifica tu cuenta de correo en el siguiente enlace.", // plain text body
            html:
              '<div style="background:#f9f9f9"><div style="background:#f9f9f9;margin:0px auto;max-width:640px;padding-top:10px;"><div style="margin:0px auto;max-width:640px;background:transparent"><img style="padding-left: 10px;" width="300px" src="https://archivospetbounds.s3-us-west-2.amazonaws.com/petbounds_blanco.png" name="Petbounds"></div><div style="margin:0px auto;max-width:640px;background:#ffffff;padding-top:20px;padding-left:10px;padding-bottom:20px;"><h2 style="font-family:lexend;color:#4f545c">Hola, ' +
              nombre +
              '</h2><p style="font-family: Lexend;color:#4f545c;margin-bottom: 40px;">Gracias por registrarte en Petbounds, da el siguiente paso y verifica tu cuenta de correo en el siguiente enlace.</p><a href="http://petbounds.xyz/#/Validacion/' +
              usuario.id +
              '" style="font-family: Lexend; padding:10px 15px;text-decoration: none;background-color: rgb(38, 0, 255);color:white;border-radius: 5px;">Verificar correo</a></div><div style="margin:0px auto;max-width:640px;background:transparent;padding-left:10px;padding-bottom:100px;"><p style="font-family:lexend;color:#99AAB5;font-size:12px;">Este correo es enviado por Petbounds porque se registró tu correo, si no fuiste tú, ignora este correo</p></div></div></div>', // html body
          });
          return usuario;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async registroOrg(correo, contra, nombre, telefono, pagina, direccion) {
    if (!isEmail.validate(correo)) return null;
    const usu = await this.store.usuario.findOne({ where: { correo: correo } });
    if (usu === null) {
      const prest = await this.store.prestador.findOne({
        where: { correo: correo },
      });
      if (prest === null) {
        const [org, created] = await this.store.organizacion.findOrCreate({
          where: { correo: correo },
          defaults: {
            contra: contra,
            nombre: nombre,
            telefono: telefono,
            pagina: pagina,
            direccion: direccion,
          },
        });
        if (created) {
          var info = this.transporter.sendMail({
            from: '"Petbounds" <noreply@petbounds.tech>',
            to: `${correo}, ${correo}`,
            subject: "¡Verifica tu correo! ✔",
            text: "Gracias por registrarte en Petbounds, da el siguiente paso y verifica tu cuenta de correo en el siguiente enlace.", // plain text body
            html:
              '<div style="background:#f9f9f9"><div style="background:#f9f9f9;margin:0px auto;max-width:640px;padding-top:10px;"><div style="margin:0px auto;max-width:640px;background:transparent"><img style="padding-left: 10px;" width="300px" src="https://archivospetbounds.s3-us-west-2.amazonaws.com/petbounds_blanco.png" name="Petbounds"></div><div style="margin:0px auto;max-width:640px;background:#ffffff;padding-top:20px;padding-left:10px;padding-bottom:20px;"><h2 style="font-family:lexend;color:#4f545c">Hola, ' +
              nombre +
              '</h2><p style="font-family: Lexend;color:#4f545c;margin-bottom: 40px;">Gracias por registrarte en Petbounds, da el siguiente paso y verifica tu cuenta de correo en el siguiente enlace.</p><a href="http://petbounds.xyz/#/Validacion/' +
              org.id +
              '" style="font-family: Lexend; padding:10px 15px;text-decoration: none;background-color: rgb(38, 0, 255);color:white;border-radius: 5px;">Verificar correo</a></div><div style="margin:0px auto;max-width:640px;background:transparent;padding-left:10px;padding-bottom:100px;"><p style="font-family:lexend;color:#99AAB5;font-size:12px;">Este correo es enviado por Petbounds porque se registró tu correo, si no fuiste tú, ignora este correo</p></div></div></div>', // html body
          });
          return org;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async registroPrest(correo, contra, nombre, telefono, ubicacion) {
    if (!isEmail.validate(correo)) return null;
    const org = await this.store.organizacion.findOne({
      where: { correo: correo },
    });
    if (org === null) {
      const usu = await this.store.usuario.findOne({
        where: { correo: correo },
      });
      if (usu === null) {
        const [prest, created] = await this.store.prestador.findOrCreate({
          where: { correo: correo },
          defaults: {
            contra: contra,
            negocio: nombre,
            telefono: telefono,
            ubicacion: ubicacion,
          },
        });
        if (created) {
          var info = this.transporter.sendMail({
            from: '"Petbounds" <noreply@petbounds.tech>',
            to: `${correo}, ${correo}`,
            subject: "¡Verifica tu correo! ✔",
            text: "Gracias por registrarte en Petbounds, da el siguiente paso y verifica tu cuenta de correo en el siguiente enlace.", // plain text body
            html:
              '<div style="background:#f9f9f9"><div style="background:#f9f9f9;margin:0px auto;max-width:640px;padding-top:10px;"><div style="margin:0px auto;max-width:640px;background:transparent"><img style="padding-left: 10px;" width="300px" src="https://archivospetbounds.s3-us-west-2.amazonaws.com/petbounds_blanco.png" name="Petbounds"></div><div style="margin:0px auto;max-width:640px;background:#ffffff;padding-top:20px;padding-left:10px;padding-bottom:20px;"><h2 style="font-family:lexend;color:#4f545c">Hola, ' +
              nombre +
              '</h2><p style="font-family: Lexend;color:#4f545c;margin-bottom: 40px;">Gracias por registrarte en Petbounds, da el siguiente paso y verifica tu cuenta de correo en el siguiente enlace.</p><a href="http://petbounds.xyz/#/Validacion/' +
              prest.id +
              '" style="font-family: Lexend; padding:10px 15px;text-decoration: none;background-color: rgb(38, 0, 255);color:white;border-radius: 5px;">Verificar correo</a></div><div style="margin:0px auto;max-width:640px;background:transparent;padding-left:10px;padding-bottom:100px;"><p style="font-family:lexend;color:#99AAB5;font-size:12px;">Este correo es enviado por Petbounds porque se registró tu correo, si no fuiste tú, ignora este correo</p></div></div></div>', // html body
          });
          return prest;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async registroMascota(
    tipo,
    raza,
    edad,
    historia,
    nombre,
    foto,
    tamano,
    sexo,
    id
  ) {
    const mascota = await this.store.mascota.create({
      tipo: tipo,
      raza: raza,
      edad: edad,
      historia: historia,
      nombre: nombre,
      foto: foto,
      organizacionId: id,
      tamano: tamano,
      sexo: sexo,
    });
    return mascota;
  }

  async registroServicio(nombre, costo, descripcion, id) {
    const servicio = await this.store.servicio.create({
      prestadorId: id,
      nombre: nombre,
      costo: costo,
      descripcion: descripcion,
    });
    return servicio;
  }

  async registroCitas(inicio, fin, id) {
    var elements = [];
    for (let i = 0; i < inicio.length; i++) {
      var element = {
        inicio: inicio[i],
        fin: fin[i],
        servicioId: id,
      };
      elements.push(element);
    }
    const citas = await this.store.cita.bulkCreate(elements);
    return citas;
  }

  async registroSolicitud(usuarioId, mascotaId, pago) {
    const flag = await this.store.solicitud.findOne({
      where: { [Op.and]: [{ usuarioId: usuarioId }, { mascotaId: mascotaId }] },
    });
    console.log(flag);
    if (flag != null) {
      return null;
    } else {
      const solicitud = await this.store.solicitud.create(
        {
          usuarioId: usuarioId,
          mascotaId: mascotaId,
          pago: pago,
        },
        {
          returning: false,
        }
      );
      return solicitud;
    }
  }

  async registroFavorito(usuarioId, mascotaId) {
    const flag = await this.store.favorito.findOne({
      where: { [Op.and]: [{ usuarioId: usuarioId }, { mascotaId: mascotaId }] },
    });
    console.log(flag);
    if (flag != null) {
      return null;
    } else {
      const favorito = await this.store.favorito.create(
        {
          usuarioId: usuarioId,
          mascotaId: mascotaId,
        },
        {
          returning: false,
        }
      );
      return favorito;
    }
  }

  async favoritoFlag(usuarioId, mascotaId) {
    const flag = await this.store.favorito.findOne({
      where: { [Op.and]: [{ usuarioId: usuarioId }, { mascotaId: mascotaId }] },
    });
    return flag;
  }

  async registroCitaUsuario(usuarioId, citaId) {
    const flag = await this.store.usuariocita.findOne({
      where: { [Op.and]: [{ usuarioId: usuarioId }, { citaId: citaId }] },
    });
    if (flag != null) {
      return null;
    } else {
      const citaUsuario = await this.store.usuariocita.create(
        {
          usuarioId: usuarioId,
          citaId: citaId,
        },
        {
          returning: false,
        }
      );
      return citaUsuario;
    }
  }

  async modificacionUsuario(
    id,
    contra,
    nombre,
    apellidoP,
    apellidoM,
    genero,
    foto,
    comprobante,
    identificacion
  ) {
    const usuario = await this.store.usuario.update(
      {
        contra: contra,
        nombre: nombre,
        apellidom: apellidoM,
        apellidop: apellidoP,
        genero: genero,
        foto: foto,
        comprobante: comprobante,
        identificacion: identificacion,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return usuario;
  }

  async modificacionOrg(
    id,
    contra,
    telefono,
    pagina,
    foto,
    direccion,
    stripeid
  ) {
    const org = await this.store.organizacion.update(
      {
        contra: contra,
        telefono: telefono,
        pagina: pagina,
        foto: foto,
        direccion: direccion,
        stripeid: stripeid,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return org;
  }

  async modificacionPrest(id, contra, telefono, ubicacion, foto) {
    const prest = await this.store.prestador.update(
      {
        contra: contra,
        telefono: telefono,
        ubicacion: ubicacion,
        foto: foto,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return prest;
  }

  async modificacionMascota(
    id,
    edad,
    historia,
    nombre,
    foto,
    tamano,
    sexo,
    estado
  ) {
    const mascota = await this.store.mascota.update(
      {
        edad: edad,
        historia: historia,
        nombre: nombre,
        foto: foto,
        tamano: tamano,
        sexo: sexo,
        estado: estado,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return mascota;
  }

  async modificacionServicio(id, costo, descripcion) {
    const servicio = await this.store.servicio.update(
      {
        costo: costo,
        descripcion: descripcion,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return servicio;
  }

  async registroMensajes(solicitudId, mensajestr, flag) {
    const men = new this.mongoStore.mensaje({
      solicitudId: solicitudId,
      msj: mensajestr,
      usuarioflag: flag,
    });
    const resp = await men.save();
    return resp;
  }

  async regValidacion(id) {
    const prestador = await this.store.prestador.findByPk(id);
    const organizacion = await this.store.organizacion.findByPk(id);
    const usuario = await this.store.usuario.findByPk(id);
    var correo = "";
    var vali;
    if (prestador != null) {
      correo = prestador.correo;
      vali = await this.store.prestador.update(
        {
          validacion: true,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } else if (organizacion != null) {
      correo = organizacion.correo;
      vali = await this.store.organizacion.update(
        {
          validacion: true,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } else {
      correo = usuario.correo;
      vali = await this.store.usuario.update(
        {
          validacion: true,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }
    if (vali[0] === 1) {
      var info = this.transporter.sendMail({
        from: '"Petbounds" <noreply@petbounds.tech>',
        to: `${correo}, ${correo}`,
        subject: "Bienvenido!",
        text: "¡Bienvenido! \n Todo el equipo de Petbounds te da un gran agradecimiento y una calurosa bienvenida a esta comunidad en la que podrás ayudar a miles de mascotas en situación de calle, los gatitos y perritos del mundo te lo agredecen!",
        html: '<div style="background:#f9f9f9" align="center"><div style="background:#f9f9f9;margin:0px auto;max-width:640px;padding-top:10px;">     <div style="margin:0px auto;max-width:640px;background:transparent"><img style="padding-left: 10px;" width="300px" src="https://archivospetbounds.s3-us-west-2.amazonaws.com/petbounds_blanco.png"></div><div style="margin:0px auto;max-width:640px;background:#ffffff;padding-top:20px;padding-left:10px;padding-bottom:20px;"><h2 style="font-family:lexend;color:#4f545c">¡Bienvenido!</h2><p style="font-family: Lexend;color:#4f545c;margin-bottom: 40px;">Todo el equipo de Petbounds te da un gran agradecimiento y una calurosa bienvenida a esta comunidad en la que podrás ayudar a miles de mascotas en situación de calle, los gatitos y perritos del mundo te lo agredecen!</p><a href="" style="font-family: Lexend; padding:10px 15px;text-decoration: none;background-color: rgb(38, 0, 255);color:white;border-radius: 5px;">Comencemos!</a></div><div style="margin:0px auto;max-width:640px;background:#ffffff;padding-top:20px;padding-left:10px;padding-bottom:20px;"><h3 style="font-family:lexend;color:#4f545c">¿Qué puedo hacer en Petbounds?</h3><img src="https://archivospetbounds.s3-us-west-2.amazonaws.com/adopcion.jpeg"><p style="font-family:Lexend;">Brinda un hogar a animales que no conocen uno</p><img width="600px" src="https://archivospetbounds.s3-us-west-2.amazonaws.com/donaciones.jpeg"><p style="font-family:Lexend;">Dona a organizaciones que cuidan de animales</p><img width="600px" src="https://archivospetbounds.s3-us-west-2.amazonaws.com/servicios.jpeg"><p style="font-family:Lexend;">Contrata servicios de cuidado para tu mejor amigo</p></div><div style="margin:0px auto;max-width:640px;background:transparent;padding-left:10px;padding-bottom:100px;"><p style="font-family:lexend;color:#99AAB5;font-size:12px;">Petbounds contact us soporte@petbounds.tech</p></div></div></div>',
      });
    }
    return vali[0];
  }

  async borrarUsuario(id) {
    const usuario = await this.store.usuario.destroy({
      where: {
        id: id,
      },
    });
    console.log(usuario);
    return usuario;
  }

  async borrarOrg(id) {
    const org = await this.store.organizacion.destroy({
      where: {
        id: id,
      },
    });
    return org;
  }

  async borrarPrest(id) {
    const prestador = await this.store.prestador.destroy({
      where: {
        id: id,
      },
    });
    return prestador;
  }

  async borrarMascota(id) {
    const mascota = await this.store.mascota.destroy({
      where: {
        id: id,
      },
    });
    return mascota;
  }

  async borrarServicio(id) {
    const servicio = await this.store.servicio.destroy({
      where: {
        id: id,
      },
    });
    return servicio;
  }

  async borrarCitas(id) {
    const cita = await this.store.cita.destroy({
      where: {
        id: id,
      },
    });
    return cita;
  }

  async borrarSolicitud(id) {
    const solicitud = await this.store.solicitud.destroy({
      where: {
        id: id,
      },
    });
    return solicitud;
  }

  async borrarFavorito(id) {
    const favorito = await this.store.favorito.destroy({
      where: {
        id: id,
      },
    });
    return favorito;
  }

  async borrarUsuarioCita(id) {
    const usuariocita = await this.store.usuariocita.destroy({
      where: {
        id: id,
      },
    });
    return usuariocita;
  }

  async borrarMensaje(id) {
    const men = await this.mongoStore.mensaje.deleteOne({ _id: id });
    return men.deletedCount;
  }

  async consultaDonacionOrg(id) {
    // [infoDonacion]
    const donaciones = await this.store.donacion.findAll({
      where: { organizacionId: id },
      include: [
        { model: this.store.donacionusuario, include: [this.store.usuario] },
        this.store.organizacion,
      ],
    });
    return donaciones;
  }

  async consultaDonacionUsuario(id) {
    //[infoDonacion]
    const donaciones = await this.store.donacionusuario.findAll({
      where: { usuarioId: id },
      include: [
        this.store.usuario,
        { model: this.store.donacion, include: [this.store.organizacion] },
      ],
    });
    return donaciones;
  }

  async consultaDonacionIndividual(id) {
    //infoDonacion
    const donaciones = await this.store.donacion.findByPk(id, {
      include: [
        { model: this.store.donacionusuario, include: [this.store.usuario] },
        this.store.organizacion,
      ],
    });
    console.log(donaciones);
    return donaciones;
  }

  async registroDonacion(organizacionId, titulo, descripcion, meta) {
    //Response
    const donacion = await this.store.donacion.create({
      organizacionId: organizacionId,
      titulo: titulo,
      descripcion: descripcion,
      meta: meta,
    });
    return donacion;
  }

  async modificacionDonacion(id, titulo, descripcion, meta) {
    //Response
    const donacion = await this.store.donacion.update(
      {
        titulo: titulo,
        descripcion: descripcion,
        meta: meta,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return donacion;
  }

  async borrarDonacion(id) {
    //Response
    const donacion = await this.store.donacion.destroy({
      where: {
        id: id,
      },
    });
    return donacion;
  }

  async altaDonacionUsuario(donacionId, usuarioId, monto) {
    //Response
    const donacionusuario = await this.store.donacionusuario.create({
      donacionId: donacionId,
      usuarioId: usuarioId,
      monto: monto,
    });
    if (donacionusuario != null) {
      const donacion = await this.store.donacion.findByPk(donacionId);
      const incrementado = await donacion.increment("total", { by: monto });
      return incrementado;
    }
    return donacionusuario;
  }

  async modificacionSolicitud(id, flag) {
    //Response
    const solicitud = await this.store.solicitud.update(
      {
        flag: flag,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return solicitud[0];
  }

  async consultaDonacionFeed() {
    //Response
    const donaciones = await this.store.donacion.findAll({
      include: [
        { model: this.store.donacionusuario, include: [this.store.usuario] },
        this.store.organizacion,
      ],
    });
    return donaciones;
  }
}

module.exports = PetAPI;
