import pessoaSchema from "../schemas/pessoa.schema";

class PessoaService {
  async create(data) {
    const created = await pessoaSchema.create(data);
    return created;
  }

  async list() {
    const list = await pessoaSchema.find();
    return list;
  }

  async update(id, data) {
    const find = await pessoaSchema.findByIdAndUpdate(id, data);
    return find;
  }

  async remove(id) {
    await pessoaSchema.findByIdAndDelete(id);
  }
}

export default new PessoaService();
