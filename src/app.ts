import express from "express";
import "express-async-errors";
import rotasUsuario from "./routes/rotasUsuario.js";
import rotasTecnologia from "./routes/rotasTecnologia.js";

const app = express();
const porta = 3000;

app.use(express.json());
app.use("/user", rotasUsuario);
//app.use("/tecnologies", rotasTecnologia);

app.listen(porta, ()=> {
    console.log(`Servidor rodando na porta ${porta}`);
})

export default app;