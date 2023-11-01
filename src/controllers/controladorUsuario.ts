import { Request, Response } from "express";
import { userServices } from "../services/servicoUsuario";
import { v4 as uuid } from "uuid";

const index = async (req: Request, res: Response) => {
    const users = await userServices.buscarTodosOsUsuarios();
    return res.json(users);
}

const show = async (req: Request, res: Response) => {
    const {username} = req.headers;
    const user = await userServices.buscarUsuarioPorUsername(username as string);
    return res.json(user);
}

const store = async (req: Request, res: Response) => {
    const {name, username, tecnologias} = req.body;
    const user = {
        id: uuid(),
        name,
        username,
        tecnologias: tecnologias || [],
    }
    const criarUsuario = await userServices.criarUsuario(user);
    if(!criarUsuario){
        return res.status(400).send({message: "Não foi possível encontrar usuário"})
    } else {
        return res.status(201).json(user);
    }
}

export const controladorUsuario = {
    index, 
    show, 
    store,
}