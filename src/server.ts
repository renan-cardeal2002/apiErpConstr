import app from "./app";

const PORT = 3333;
const HOST = "0.0.0.0";

function main() {
  try {
    app.listen(PORT, HOST, () => {
      console.log(`Listening port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
main();
