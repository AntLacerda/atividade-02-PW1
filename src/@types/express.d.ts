import { UsuarioDTO } from "../dtos/dtoUsuario";

declare global {
    namespace Express {
        interface Request {
            username: string;
        }
    }
}