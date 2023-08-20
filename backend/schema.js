const { gql } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

const typeDefs = gql`
  scalar Date

  scalar Time

  type solicitud {
    id: ID!
    usuario: usuario
    mascota: mascota
    pago: String
    flag: Boolean
  }

  type favorito {
    id: ID!
    usuario: usuario
    mascotaFav: mascota
  }

  type usuario {
    id: ID!
    correo: String!
    contra: String!
    nombre: String!
    apellidop: String!
    apellidom: String!
    nickname: String!
    nacimiento: Date
    genero: String
    foto: String
    identificacion: String
    comprobante: String
    validacion: Boolean
  }

  type mascota {
    id: ID!
    tipo: String
    raza: String
    edad: String
    historia: String
    nombre: String
    foto: String
    tamano: String
    sexo: String
    estado: Int
    organizacion: organizacion
  }

  type organizacion {
    id: ID!
    correo: String!
    contra: String!
    nombre: String!
    telefono: String
    pagina: String
    foto: String
    direccion: String
    validacion: Boolean
    stripeid: String
  }

  type servicio {
    id: ID!
    nombre: String
    costo: Float
    descripcion: String
    prestador: prestador
  }

  type prestador {
    id: ID!
    correo: String!
    contra: String!
    negocio: String!
    telefono: String
    ubicacion: String
    foto: String
    validacion: Boolean
  }

  type cita {
    id: ID!
    servicio: servicio
    inicio: Time
    fin: Time
  }

  type usuariocita {
    id: ID!
    usuario: usuario
    cita: cita
  }

  type donacion {
    id: ID!
    organizacion: organizacion
    titulo: String
    descripcion: String
    meta: Int
    total: Int
  }

  type donacionusuario {
    id: ID!
    donacion: donacion
    usuario: usuario
    monto: Int
    fechasubida: String
  }

  type infoServ {
    id: ID!
    nombre: String
    costo: Float
    descripcion: String
    prestador: prestador
    cita: [cita]
  }

  type infoDonacion {
    id: ID!
    organizacion: organizacion
    titulo: String
    descripcion: String
    meta: Int
    total: Int
    donacionusuarios: [donacionusuario]
  }

  type mensaje {
    _id: String
    solicitudId: ID
    msj: String
    usuarioflag: Boolean
  }

  type Query {
    mascotasFeed: [mascota]

    serviciosFeed: [servicio]

    usuario(id: ID!): usuario

    organizacion(id: ID!): organizacion

    prestador(id: ID!): prestador

    servicioSelec(id: ID!): infoServ

    mascotaSelec(id: ID!): mascota

    mascotasOrg(id: ID!): [mascota]

    serviciosNeg(id: ID!): [servicio]

    solicitudesOrg(id: ID!): [solicitud]

    solicitudesUsuario(id: ID!): [solicitud]

    solicitudesSeleccionada(id: ID!): solicitud

    favoritosUsuario(id: ID!): [favorito]

    citasServicio(id: ID!): [usuariocita]

    citasUsuario(id: ID!): [usuariocita]

    consultaMensajes(solicitudId: ID!): [mensaje]

    favoritoFlag(usuarioId: ID!, mascotaId: ID!): Response

    consultaDonacionOrg(id: ID!): [infoDonacion]

    consultaDonacionUsuario(id: ID!): [donacionusuario]

    consultaDonacionIndividual(id: ID!): infoDonacion

    donacionFeed: [infoDonacion]
  }

  type Response {
    success: Boolean!
    message: String
  }

  type ResInicio {
    flag: Boolean
    id: String
    cuenta: String
    validacion: Boolean
  }

  type Mutation {
    registroUsuario(
      correo: String!
      contra: String!
      nombre: String!
      apellidoP: String!
      apellidoM: String!
      nickname: String!
      nacimiento: Date
      genero: String
    ): usuario

    modificacionUsuario(
      id: String!
      contra: String
      nombre: String
      apellidop: String
      apellidom: String
      genero: String
      foto: String
      comprobante: String
      identificacion: String
    ): Response

    registroOrg(
      correo: String!
      contra: String!
      nombre: String!
      telefono: String!
      pagina: String
      direccion: String
    ): organizacion

    modificacionOrg(
      id: String!
      contra: String
      telefono: String
      pagina: String
      foto: String
      direccion: String
      stripeid: String
    ): Response

    registroPrest(
      correo: String!
      contra: String!
      nombre: String!
      telefono: String
      ubicacion: String
    ): prestador

    modificacionPrest(
      id: String!
      contra: String
      telefono: String
      ubicacion: String
      foto: String
    ): Response

    inicioSesion(correo: String!, contra: String!): ResInicio

    registroMascota(
      tipo: String
      raza: String
      edad: String
      historia: String
      nombre: String
      foto: String
      tamano: String
      sexo: String
      id: ID!
    ): Response

    modificacionMascota(
      id: String!
      edad: String
      historia: String
      nombre: String
      foto: String
      tamano: String
      sexo: String
      estado: Int
    ): Response

    registroServicio(
      nombre: String
      costo: Float
      descripcion: String
      id: ID!
    ): servicio

    registroCitas(inicio: [Time]!, fin: [Time]!, id: ID!): Response

    modificacionServicio(
      id: String!
      costo: Float
      descripcion: String
    ): Response

    registroSolicitud(usuarioId: ID!, mascotaId: ID!, pago: String): Response

    modificacionSolicitud(id: ID!, flag: Boolean!): Response

    registroFavorito(usuarioId: ID!, mascotaId: ID!): Response

    registroCitaUsuario(usuarioId: ID!, citaId: ID!): Response

    registroMensaje(
      solicitudId: ID!
      msj: String!
      usuarioflag: Boolean!
    ): Response

    regValidacion(id: ID!): Response

    borrarUsuario(id: ID!): Response

    borrarOrg(id: ID!): Response

    borrarPrest(id: ID!): Response

    borrarMascota(id: ID!): Response

    borrarServicio(id: ID!): Response

    borrarCitas(id: [ID]!): Response

    borrarSolicitud(id: ID!): Response

    borrarFavorito(id: ID!): Response

    borrarUsuarioCita(id: ID!): Response

    borrarMensaje(id: String): Response

    registroDonacion(
      organizacionId: ID!
      titulo: String!
      descripcion: String!
      meta: Int!
    ): Response

    modificacionDonacion(
      id: ID!
      titulo: String
      descripcion: String
      meta: Int
    ): Response

    borrarDonacion(id: ID!): Response

    altaDonacionUsuario(donacionId: ID!, usuarioId: ID!, monto: Int!): Response
  }

  type Subscription {
    mensajeEnviado(id: ID!): mensaje
  }
`;

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return ast.value;
    }
    return null;
  },
});

const timeScalar = new GraphQLScalarType({
  name: "Time",
  description: "Time custom scalar type",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  },
});

module.exports.typeDefs = typeDefs;
module.exports.dateScalar = dateScalar;
module.exports.timeScalar = timeScalar;
