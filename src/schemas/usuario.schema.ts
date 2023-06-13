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
  },
  {
    timestamps: true,
  }
);

export default model("usuario", UsuarioSchema);
