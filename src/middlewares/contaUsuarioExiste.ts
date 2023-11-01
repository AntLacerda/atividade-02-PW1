import { Request, Response, NextFunction } from "express";
import { userServices } from "../services/servicoUsuario";

export const contaUsuarioExiste = async (req: Request, res: Response, next: NextFunction) => {
    const {username} = req.headers;
    const user = await userServices.buscarUsuarioPorUsername(username as string);
    if(!user) {
        return res.status(404).send({message:"Usuario não encontrado"});
    } else {
        next();
    }
}