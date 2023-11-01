import { Router } from "express";
import { contaUsuarioExiste } from "../middlewares/contaUsuarioExiste";
import { controladorUsuario } from "../controllers/controladorUsuario";

const router = Router();

router.get("/", controladorUsuario.index);
router.post("/", controladorUsuario.store);
router.get("/:username", contaUsuarioExiste, controladorUsuario.show);

export default router;