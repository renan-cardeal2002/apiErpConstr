import usuarioSchema from "../schemas/usuario.schema";

class ProductService {
  async create(data) {
    const created = await usuarioSchema.create(data);
    return created;
  }

  async list() {
    const list = await usuarioSchema.find();
    return list;
  }

  async find(login, senha) {
    console.log(login, senha);
    const find = await usuarioSchema.find({ login, senha });
    return find;
  }

  async update(id, data) {
    const find = await usuarioSchema.findByIdAndUpdate(id, data);
    return find;
  }

  async remove(id) {
    await usuarioSchema.findByIdAndDelete(id);
  }
}

export default new ProductService();
