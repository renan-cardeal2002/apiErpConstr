import { model, Schema } from "mongoose";

const UsuarioSchema = new Schema(
  {
    login: {
      required: true,
      type: String,
    },
    senha: {
      required: true,
      type: String,
    },
    empresas: {
      required: false,
      type: Array,
    },
    aplicacoes: {
      required: false,
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default model("usuario", UsuarioSchema);
