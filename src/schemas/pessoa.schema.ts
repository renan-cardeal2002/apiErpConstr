import { model, Schema } from "mongoose";

const PessoaSchema = new Schema(
  {
    nome: {
      required: true,
      type: String,
    },
    situacao: {
      required: true,
      type: String,
    },
    tipoPessoa: {
      required: true,
      type: String,
    },
    enderecos: {
      required: false,
      type: Array,
    },
    equipe: {
      required: false,
      type: Object,
    },
    cnpjCpf: {
      required: true,
      type: String,
    },
    rg: {
      required: false,
      type: String,
    },
    inscricaoEstadual: {
      required: false,
      type: String,
    },
    inscricaoMunicipal: {
      required: false,
      type: String,
    },
    flagCliente: {
      required: false,
      type: Boolean,
    },
    flagFuncionario: {
      required: false,
      type: Boolean,
    },
    flagFornecedor: {
      required: false,
      type: Boolean,
    },
    tipoFuncionario: {
      requied: false,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("pessoa", PessoaSchema);
