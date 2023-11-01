
import { Prisma, PrismaClient } from "@prisma/client";
import { TecnologiaDTO, PostTechnologyDTO } from "../dtos/dtoTecnologia";
import { UsuarioDTO } from "../dtos/dtoUsuario";
import { userServices } from "./servicoUsuario";
import { response as res} from "express";

const prisma = new PrismaClient();

const buscarTecnologia = async (idTec: string, username: string) => {
    const user = await userServices.buscarUsuarioPorUsername(username);
    const tecnology = await prisma.technology.findUnique({
        where: {
            id: idTec,
            userId: user?.id
        }
    })
    
    return tecnology as TecnologiaDTO;
}

const tecnologiaExiste = async (idTec: string, username: string) => {
    const tecnology = await buscarTecnologia(idTec, username);
    return tecnology ? true : false;
}

//CREATE
const criarTecnologia = async (username: string, tecnologia: PostTechnologyDTO) => {
    const user = await userServices.buscarUsuarioPorUsername(username);
    const newTech = await prisma.technology.create({
        data: {
            title: tecnologia.title,
            studied: false,
            deadline: new Date(tecnologia.deadline),
            userId: user?.id,
        }
    })
    return newTech;
}

//READ
const buscarTodastecnologias = async (username: string) => {
    const user = await userServices.buscarUsuarioPorUsername(username);
    const tech = await prisma.technology.findMany({
        where:{
            userId: user?.id,
        }
    }) 

    return tech as TecnologiaDTO[];
}

//UPDATE
const atualizarTecnologia = async (username: string, idTec: string, tituloNovo: string, prazoFinal: Date) => {
    const user = await userServices.buscarUsuarioPorUsername(username);
    const tech = await buscarTecnologia(idTec, username);
    const updateTech = await prisma.technology.update({
        where:{
            id: idTec,
            userId: user?.id,
        }, data:{
            title: tituloNovo || tech?.title,
            deadline: new Date(prazoFinal!) || tech?.deadline,
        }
    })
    return updateTech;
}

//UPDATE
const atualizarStatusTecnologia = async (username: string, idTec: string) => {
    const user = await userServices.buscarUsuarioPorUsername(username);
    const tech = await buscarTecnologia(idTec, username);
    const updateTech = await prisma.technology.update({
        where:{
            id: idTec, 
            userId: user?.id,
        }, 
        data: {
            studied: !tech?.studied,
        }
    })
    return updateTech;
}

//DELETE
const deletarTecnologia = async (username: string, idTec: string) => {
    const user = await userServices.buscarUsuarioPorUsername(username);
    const deleteTech = await prisma.technology.delete({
        where: {
            id: idTec, 
            userId: user?.id,
        }
    })
    return deleteTech;
}

export const tecnologyServices = {
    buscarTecnologia,
    buscarTodastecnologias,
    criarTecnologia,
    atualizarTecnologia, 
    atualizarStatusTecnologia, 
    deletarTecnologia,
}
