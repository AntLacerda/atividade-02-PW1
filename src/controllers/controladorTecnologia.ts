import { Request, Response } from "express";
import { tecnologyServices } from "../services/servicoTecnologia";
import { v4 as uuid } from "uuid";

const index = async (req: Request, res: Response) => {
    const {username} = req.headers;
    const tecnologias = await tecnologyServices.buscarTodastecnologias(username as string);
    return res.json(tecnologias);
}

const store = async (req: Request, res: Response) => {
    const {username} = req.headers;
    const {titulo, prazoFinal} = req.body;
    if(!titulo || !prazoFinal) {
        return res.status(400).send({message: "Titulo e prazo final são necessários!"})
    } else {
        const tecnologia = {
            id: uuid(),
            title: titulo,
            studied: false,
            deadline: new Date(prazoFinal),
            createdAt: new Date(),
        }

        const criarTecnologia = await tecnologyServices.criarTecnologia(username as string, tecnologia);
        
        if(!criarTecnologia){
            return res.status(400).send({message: "Tecnologia já existe!"})
        } else {
            return res.status(201).json(tecnologia);
        }
    }
}

const update = async (req: Request, res: Response) => {
    const {username} = req.headers;
    const {idTec} = req.params;
    const {titulo, prazoFinal} = req.body;
    if(!titulo || !prazoFinal){
        return res.status(400).send({message: "Titulo e prazo final são necessários!"})
    } else {
        const atualizaTecnologia = await tecnologyServices.atualizarTecnologia(username as string, idTec, titulo, prazoFinal);

        if(!atualizaTecnologia) {
            return res.status(404).send({message: "Tecnologia não encontrada!"})
        } else {
            return res.status(204).send();
        }
    }
}

const updateStatus = async (req: Request, res: Response) => {
    const {username} = req.headers;
    const {idTec} = req.params;
    const atualizarTecnologia = await tecnologyServices.atualizarStatusTecnologia(username as string, idTec);
    if(!atualizarTecnologia) {
        return res.status(404).send({message: "Tecnologia não encontrada!"})
    } else {
        return res.status(204).send();
    }
}

const destroy = async (req: Request, res: Response) => {
    const {username} = req.headers;
    const {idTec} = req.params;
    const deletarTecnologia = await tecnologyServices.deletarTecnologia(username as string, idTec);
    
    if(!deletarTecnologia) {
        return res.status(404).send({message: "Tecnologia não encontrada!"})
    } else {
        return res.status(204).send();
    }
}

export const controladorTecnologia = {
    index, 
    store, 
    update, 
    updateStatus,
    destroy,
}