const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

module.exports.createStore = () => {
  const sequelize = new Sequelize(
    `postgres://${process.env.dbUser}:${process.env.dbPass}@${process.env.dbUrl}:${process.env.dbPort}/${process.env.dbName}`,
    {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
  );

  const usuario = sequelize.define(
    "usuario",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      correo: DataTypes.STRING,
      contra: DataTypes.STRING,
      nombre: DataTypes.STRING,
      apellidop: DataTypes.STRING,
      apellidom: DataTypes.STRING,
      nickname: DataTypes.STRING,
      nacimiento: DataTypes.DATE,
      genero: DataTypes.STRING,
      foto: DataTypes.STRING,
      identificacion: DataTypes.STRING,
      comprobante: DataTypes.STRING,
      validacion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      tableName: "usuarios",
    }
  );

  const organizacion = sequelize.define(
    "organizacion",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      correo: DataTypes.STRING,
      contra: DataTypes.STRING,
      nombre: DataTypes.STRING,
      telefono: DataTypes.STRING,
      pagina: DataTypes.STRING,
      foto: DataTypes.STRING,
      direccion: DataTypes.STRING,
      validacion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      stripeid: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: "organizaciones",
    }
  );

  const prestador = sequelize.define(
    "prestador",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      correo: DataTypes.STRING,
      contra: DataTypes.STRING,
      telefono: DataTypes.STRING,
      negocio: DataTypes.STRING,
      ubicacion: DataTypes.STRING,
      foto: DataTypes.STRING,
      validacion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      tableName: "prestadores",
    }
  );

  const servicio = sequelize.define(
    "servicio",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      prestadorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: prestador,
          key: "id",
        },
      },
      nombre: DataTypes.STRING,
      costo: DataTypes.DECIMAL(5, 2),
      descripcion: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: "servicios",
    }
  );

  const cita = sequelize.define(
    "cita",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      servicioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: servicio,
          key: "id",
        },
      },
      inicio: DataTypes.TIME,
      fin: DataTypes.TIME,
    },
    {
      timestamps: false,
      tableName: "citas",
    }
  );

  const mascota = sequelize.define(
    "mascota",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      organizacionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: organizacion,
          key: "id",
        },
      },
      tipo: DataTypes.STRING,
      raza: DataTypes.STRING,
      edad: DataTypes.STRING,
      historia: DataTypes.STRING,
      nombre: DataTypes.STRING,
      foto: DataTypes.STRING,
      tamano: DataTypes.STRING,
      sexo: DataTypes.STRING,
      estado: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      tableName: "mascotas",
    }
  );

  const solicitud = sequelize.define(
    "solicitud",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      usuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: usuario,
          key: "id",
        },
      },
      mascotaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: mascota,
          key: "id",
        },
      },
      pago: DataTypes.STRING,
      flag: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      tableName: "solicitudes",
    }
  );

  const donacion = sequelize.define(
    "donacion",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      organizacionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: organizacion,
          key: "id",
        },
      },
      titulo: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      meta: DataTypes.INTEGER,
      total: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      tableName: "donaciones",
    }
  );

  const donacionusuario = sequelize.define(
    "donacionusuario",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      donacionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: donacion,
          key: "id",
        },
      },
      usuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: usuario,
          key: "id",
        },
      },
      monto: DataTypes.INTEGER,
      fechasubida: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "donacionusuarios",
    }
  );

  const favorito = sequelize.define(
    "favorito",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      usuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: usuario,
          key: "id",
        },
      },
      mascotaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: mascota,
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      tableName: "favoritos",
    }
  );

  const usuariocita = sequelize.define(
    "usuariocita",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      usuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: usuario,
          key: "id",
        },
      },
      citaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: cita,
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      tableName: "usuariocita",
    }
  );

  organizacion.hasMany(mascota);
  mascota.belongsTo(organizacion);
  prestador.hasMany(servicio);
  servicio.belongsTo(prestador);
  servicio.hasMany(cita);
  cita.belongsTo(servicio);
  usuario.hasMany(solicitud, { foreignKey: "usuarioId" });
  solicitud.belongsTo(usuario, { foreignKey: "usuarioId" });
  mascota.hasMany(solicitud, { as: "mascota", foreignKey: "mascotaId" });
  solicitud.belongsTo(mascota, { as: "mascota", foreignKey: "mascotaId" });
  usuario.hasMany(favorito, { foreignKey: "usuarioId" });
  favorito.belongsTo(usuario, { foreignKey: "usuarioId" });
  mascota.hasMany(favorito, { as: "mascotaFav", foreignKey: "mascotaId" });
  favorito.belongsTo(mascota, { as: "mascotaFav", foreignKey: "mascotaId" });
  usuario.hasMany(usuariocita, { foreignKey: "usuarioId" });
  usuariocita.belongsTo(usuario), { foreignKey: "usuarioId" };
  cita.hasMany(usuariocita, { as: "cita", foreignKey: "citaId" });
  usuariocita.belongsTo(cita, { as: "cita", foreignKey: "citaId" });
  organizacion.hasMany(donacion);
  donacion.belongsTo(organizacion);
  usuario.hasMany(donacionusuario, { foreignKey: "usuarioId" });
  donacionusuario.belongsTo(usuario, { foreignKey: "usuarioId" });
  donacion.hasMany(donacionusuario, { foreignKey: "donacionId" });
  donacionusuario.belongsTo(donacion, { foreignKey: "donacionId" });

  return {
    sequelize,
    usuario,
    organizacion,
    prestador,
    servicio,
    cita,
    mascota,
    solicitud,
    favorito,
    usuariocita,
    donacion,
    donacionusuario,
  };
};
