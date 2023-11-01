import { Router } from "express";
import { controladorTecnologia } from "../controllers/controladorTecnologia";
import { contaUsuarioExiste } from "../middlewares/contaUsuarioExiste";

const router = Router();

router.get("/", contaUsuarioExiste, controladorTecnologia.index);
router.post("/", contaUsuarioExiste, controladorTecnologia.store);
router.put("/:idTec", contaUsuarioExiste, controladorTecnologia.update);
router.patch("/:idTec/studied", contaUsuarioExiste, controladorTecnologia.updateStatus);
router.delete("/:idTec", contaUsuarioExiste, controladorTecnologia.destroy);

export default router;