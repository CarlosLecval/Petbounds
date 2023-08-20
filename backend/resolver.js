const { dateScalar, timeScalar } = require("./schema");
const { PubSub, withFilter } = require("apollo-server-express");

const pubsub = new PubSub();

module.exports = {
  Date: dateScalar,
  Time: timeScalar,
  Query: {
    mascotasFeed: async (_, __, { dataSources }) => {
      return dataSources.petAPI.mostrarMascotasFeed();
    },
    serviciosFeed: async (_, __, { dataSources }) => {
      return dataSources.petAPI.mostrarServiciosFeed();
    },
    usuario: async (_, args, { dataSources }) => {
      return dataSources.petAPI.mostrarUsuario(args.id);
    },
    organizacion: async (_, args, { dataSources }) => {
      return dataSources.petAPI.mostrarOrg(args.id);
    },
    prestador: async (_, args, { dataSources }) => {
      return dataSources.petAPI.mostrarPrest(args.id);
    },
    servicioSelec: async (_, args, { dataSources }) => {
      //inforservicio
      return dataSources.petAPI.servicioSeleccionado(args.id);
    },
    mascotaSelec: async (_, args, { dataSources }) => {
      return dataSources.petAPI.mascotaSeleccionada(args.id);
    },
    mascotasOrg: async (_, args, { dataSources }) => {
      return dataSources.petAPI.mascotaOrganizacion(args.id);
    },
    serviciosNeg: async (_, args, { dataSources }) => {
      return dataSources.petAPI.serviciosPrestador(args.id);
    },
    solicitudesOrg: async (_, args, { dataSources }) => {
      return dataSources.petAPI.solicitudesOrganizacion(args.id);
    },
    solicitudesUsuario: async (_, args, { dataSources }) => {
      return dataSources.petAPI.solicitudesUsuario(args.id);
    },
    solicitudesSeleccionada: async (_, args, { dataSources }) => {
      return dataSources.petAPI.solicitudSeleccionada(args.id);
    },
    favoritosUsuario: async (_, args, { dataSources }) => {
      return dataSources.petAPI.favoritosUsuario(args.id);
    },
    citasServicio: async (_, args, { dataSources }) => {
      return dataSources.petAPI.citasPrestador(args.id);
    },
    citasUsuario: async (_, args, { dataSources }) => {
      return dataSources.petAPI.citasUsuario(args.id);
    },
    consultaMensajes: async (_, args, { dataSources }) => {
      return dataSources.petAPI.consultaMensajes(args.solicitudId);
    },
    favoritoFlag: async (_, args, { dataSources }) => {
      //Response
      const favorito = await dataSources.petAPI.favoritoFlag(
        args.usuarioId,
        args.mascotaId
      );
      return {
        success: favorito != null ? true : false,
        message: favorito != null ? favorito.id : "no existe",
      };
    },
    consultaDonacionOrg: async (_, args, { dataSources }) => {
      // [infoDonacion]
      return dataSources.petAPI.consultaDonacionOrg(args.id);
    },

    consultaDonacionUsuario: async (_, args, { dataSources }) => {
      return dataSources.petAPI.consultaDonacionUsuario(args.id);
    },

    consultaDonacionIndividual: async (_, args, { dataSources }) => {
      //infoDonacion
      return dataSources.petAPI.consultaDonacionIndividual(args.id);
    },

    donacionFeed: async (_, args, { dataSources }) => {
      //infoDonacion
      return dataSources.petAPI.consultaDonacionFeed();
    },
  },
  Mutation: {
    registroUsuario: async (_, args, { dataSources }) => {
      return dataSources.petAPI.registroUsuario(
        args.correo,
        args.contra,
        args.nombre,
        args.apellidoP,
        args.apellidoM,
        args.nickname,
        args.nacimiento,
        args.genero
      );
    },

    modificacionUsuario: async (_, args, { dataSources }) => {
      const flag = await dataSources.petAPI.modificacionUsuario(
        args.id,
        args.contra,
        args.nombre,
        args.apellidop,
        args.apellidom,
        args.genero,
        args.foto,
        args.comprobante,
        args.identificacion
      );
      return {
        success: flag ? true : false,
        message: flag ? "Modificado" : "Error",
      };
    },

    registroOrg: async (_, args, { dataSources }) => {
      return dataSources.petAPI.registroOrg(
        args.correo,
        args.contra,
        args.nombre,
        args.telefono,
        args.pagina,
        args.direccion
      );
    },

    modificacionOrg: async (_, args, { dataSources }) => {
      const flag = await dataSources.petAPI.modificacionOrg(
        args.id,
        args.contra,
        args.telefono,
        args.pagina,
        args.foto,
        args.direccion,
        args.stripeid
      );
      return {
        success: flag ? true : false,
        message: flag ? "Modificado" : "Error",
      };
    },

    registroPrest: async (_, args, { dataSources }) => {
      return dataSources.petAPI.registroPrest(
        args.correo,
        args.contra,
        args.nombre,
        args.telefono,
        args.ubicacion
      );
    },

    modificacionPrest: async (_, args, { dataSources }) => {
      const flag = await dataSources.petAPI.modificacionPrest(
        args.id,
        args.contra,
        args.telefono,
        args.ubicacion,
        args.foto
      );
      return {
        success: flag ? true : false,
        message: flag ? "Modificado" : "Error",
      };
    },

    inicioSesion: async (_, args, { dataSources }) => {
      //Response
      var flag = false;
      var cuenta = "";
      const res = await dataSources.petAPI.inicioSesion(
        args.correo,
        args.contra
      );
      if (res == null) {
        flag = true;
        cuenta = "existe";
      } else if (typeof res === "boolean") {
        flag = true;
        cuenta = "contra";
      }
      return {
        flag: !flag ? true : false,
        id: !flag ? res.id : "",
        cuenta: !flag ? res.cuenta : cuenta,
        validacion: !flag ? res.validacion : false,
      };
    },

    registroMascota: async (_, args, { dataSources }) => {
      //Response
      const mascota = await dataSources.petAPI.registroMascota(
        args.tipo,
        args.raza,
        args.edad,
        args.historia,
        args.nombre,
        args.foto,
        args.tamano,
        args.sexo,
        args.id
      );
      return {
        success: mascota != null ? true : false,
        message: mascota != null ? mascota.nombre : null,
      };
    },

    modificacionMascota: async (_, args, { dataSources }) => {
      const flag = await dataSources.petAPI.modificacionMascota(
        args.id,
        args.edad,
        args.historia,
        args.nombre,
        args.foto,
        args.tamano,
        args.sexo,
        args.estado
      );
      return {
        success: flag ? true : false,
        message: flag ? "Modificado" : "Error",
      };
    },

    registroServicio: async (_, args, { dataSources }) => {
      return dataSources.petAPI.registroServicio(
        args.nombre,
        args.costo,
        args.descripcion,
        args.id
      );
    },

    registroCitas: async (_, args, { dataSources }) => {
      //Response
      const cita = await dataSources.petAPI.registroCitas(
        args.inicio,
        args.fin,
        args.id
      );
      return {
        success: cita != null ? true : false,
        message: cita != null ? "creado" : "sin exito",
      };
    },

    modificacionServicio: async (_, args, { dataSources }) => {
      //infoServicio
      const flag = await dataSources.petAPI.modificacionServicio(
        args.id,
        args.costo,
        args.descripcion
      );
      return {
        success: flag ? true : false,
        message: flag ? "Modificado" : "Error",
      };
    },

    registroSolicitud: async (_, args, { dataSources }) => {
      //Response
      const solicitud = await dataSources.petAPI.registroSolicitud(
        args.usuarioId,
        args.mascotaId,
        args.pago
      );
      return {
        success: solicitud != null ? true : false,
        message: solicitud != null ? solicitud.id : "sin exito",
      };
    },

    modificacionSolicitud: async (_, args, { dataSources }) => {
      //Response
      const solicitud = await dataSources.petAPI.modificacionSolicitud(
        args.id,
        args.flag
      );
      return {
        success: solicitud === 1 ? true : false,
        message: solicitud === 1 ? "exito" : "sin exito",
      };
    },

    registroFavorito: async (_, args, { dataSources }) => {
      //Response
      const favorito = await dataSources.petAPI.registroFavorito(
        args.usuarioId,
        args.mascotaId
      );
      return {
        success: favorito != null ? true : false,
        message: favorito != null ? favorito.id : "sin exito",
      };
    },

    registroCitaUsuario: async (_, args, { dataSources }) => {
      //Response
      const citaUsuario = await dataSources.petAPI.registroCitaUsuario(
        args.usuarioId,
        args.citaId
      );
      return {
        success: citaUsuario != null ? true : false,
        message: citaUsuario != null ? "creado" : "sin exito",
      };
    },

    registroMensaje: async (_, args, { dataSources }) => {
      pubsub.publish("MENSAJE_ENVIADO", { mensajeEnviado: args });
      const men = await dataSources.petAPI.registroMensajes(
        args.solicitudId,
        args.msj,
        args.usuarioflag
      );
      return {
        success: men != null ? true : false,
        message: men != null ? "creado" : "error",
      };
    },

    regValidacion: async (_, args, { dataSources }) => {
      const vali = await dataSources.petAPI.regValidacion(args.id);
      return {
        success: vali === 1 ? true : false,
        message: vali === 1 ? "validado" : "error",
      };
    },

    borrarUsuario: async (_, args, { dataSources }) => {
      //Response
      const flag = await dataSources.petAPI.borrarUsuario(args.id);
      return {
        success: flag ? true : false,
        message: flag ? "Borrado" : "Error",
      };
    },

    borrarOrg: async (_, args, { dataSources }) => {
      //Response
      const flag = await dataSources.petAPI.borrarOrg(args.id);
      return {
        success: flag ? true : false,
        message: flag ? "Borrado" : "Error",
      };
    },

    borrarPrest: async (_, args, { dataSources }) => {
      //Response
      const flag = await dataSources.petAPI.borrarPrest(args.id);
      return {
        success: flag ? true : false,
        message: flag ? "Borrado" : "Error",
      };
    },

    borrarMascota: async (_, args, { dataSources }) => {
      //Response
      const flag = await dataSources.petAPI.borrarMascota(args.id);
      return {
        success: flag ? true : false,
        message: flag ? "Borrado" : "Error",
      };
    },

    borrarServicio: async (_, args, { dataSources }) => {
      //Response
      const flag = await dataSources.petAPI.borrarServicio(args.id);
      return {
        success: flag ? true : false,
        message: flag ? "Borrado" : "Error",
      };
    },

    borrarCitas: async (_, args, { dataSources }) => {
      //Response
      const flag = await dataSources.petAPI.borrarCitas(args.id);
      return {
        success: flag ? true : false,
        message: flag ? "Borrado" : "Error",
      };
    },

    borrarSolicitud: async (_, args, { dataSources }) => {
      //Response
      const flag = await dataSources.petAPI.borrarSolicitud(args.id);
      return {
        success: flag ? true : false,
        message: flag ? "Borrado" : "Error",
      };
    },

    borrarFavorito: async (_, args, { dataSources }) => {
      //Response
      const flag = await dataSources.petAPI.borrarFavorito(args.id);
      return {
        success: flag ? true : false,
        message: flag ? "Borrado" : "Error",
      };
    },

    borrarUsuarioCita: async (_, args, { dataSources }) => {
      //Response
      const flag = await dataSources.petAPI.borrarUsuarioCita(args.id);
      return {
        success: flag ? true : false,
        message: flag ? "Borrado" : "Error",
      };
    },

    borrarMensaje: async (_, args, { dataSources }) => {
      const resp = await dataSources.petAPI.borrarMensaje(args.id);
      return {
        success: resp > 0 ? true : false,
        message: resp > 0 ? "Borrado" : "Error",
      };
    },

    registroDonacion: async (_, args, { dataSources }) => {
      //Response
      const resp = await dataSources.petAPI.registroDonacion(
        args.organizacionId,
        args.titulo,
        args.descripcion,
        args.meta
      );
      return {
        success: resp != null ? true : false,
        message: resp != null ? resp.id : "Error",
      };
    },

    modificacionDonacion: async (_, args, { dataSources }) => {
      //Response
      const resp = await dataSources.petAPI.modificacionDonacion(
        args.id,
        args.titulo,
        args.descripcion,
        args.meta
      );
      return {
        success: resp[0] != 0 ? true : false,
        message: resp[0] != 0 ? "modificado" : "Error",
      };
    },

    borrarDonacion: async (_, args, { dataSources }) => {
      //Response
      const resp = await dataSources.petAPI.borrarDonacion(args.id);
      return {
        success: resp[0] != 0 ? true : false,
        message: resp[0] != 0 ? "Borrar" : "Error",
      };
    },

    altaDonacionUsuario: async (_, args, { dataSources }) => {
      //Response
      const resp = await dataSources.petAPI.altaDonacionUsuario(
        args.donacionId,
        args.usuarioId,
        args.monto
      );
      return {
        success: resp != null ? true : false,
        message: resp != null ? resp.id : "Error",
      };
    },
  },
  Subscription: {
    mensajeEnviado: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(["MENSAJE_ENVIADO"]),
        (payload, variables) => {
          return payload.mensajeEnviado.solicitudId === variables.id;
        }
      ),
    },
  },
};
