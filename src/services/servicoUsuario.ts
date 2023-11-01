import { UsuarioDTO } from "../dtos/dtoUsuario";
import { response as res } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const buscarUsuarioPorId = async (id: string) => {
    const usuario = prisma.user.findUnique({
        where:{
            id,
        }
    })
    if(!usuario){
        return res.status(404).send("Usuário não encontrado!");
    }
    return usuario;
}

const buscarUsuarioPorUsername = async (username: string) => {
    const usuario = await prisma.user.findUnique({
        where: {
            username,
        }
    })
    return usuario;
}

const buscarTodosOsUsuarios = async ()=> {
    return await prisma.user.findMany();
}

const usuarioExiste = async (username: string): Promise<boolean> => {
    const usuario = await prisma.user.findUnique({
        where:{
            username,
        }
    })
    return usuario ? true : false;
}

const criarUsuario = async (usuario: UsuarioDTO) => {
    if(await usuarioExiste(usuario.username)){
        return res.status(400).send("Usuário já existe!");
    }

    const novoUsuario = await prisma.user.create({
        data: {
            username: usuario.username,
            name: usuario.name
        }
    })

    if(!novoUsuario){
        return res.status(400).send("Usuário não foi criado!");
    }

    return novoUsuario;
}

export const userServices = {
    usuarioExiste, 
    buscarUsuarioPorId, 
    buscarUsuarioPorUsername, 
    buscarTodosOsUsuarios, 
    criarUsuario,
}