const MongoLib = require("../../lib/mongo");

class UsuarioServicio {
  constructor() {
    this.collection = "usuario";
    this.mongoDB = new MongoLib();
  }

  async getUsuarios({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const usuario = await this.mongoDB.getAll(this.collection, query);

    return usuario || [];
  }

  async getUsuario({ usuarioId }) {
    const usuario = await this.mongoDB.get(this.collection, usuarioId);
    return usuario || [];
  }

  async createUsusario({ usuario }) {
    const usuarioCrear = await this.mongoDB.create(this.collection, usuario);
    return usuarioCrear;
  }

  async updateUsuario({ usuarioId, usuario }) {
    const usuarioActualizar = await this.mongoDB.update(
      this.collection,
      usuarioId,
      usuario
    );

    return usuarioActualizar;
  }

  async deleteUsuario({ usuarioId }) {
    const usuarioBorrar = await this.mongoDB.delete(this.collection, usuarioId);

    return usuarioBorrar;
  }
}

module.exports = UsuarioServicio;
