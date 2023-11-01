export type TecnologiaDTO = {
    id: string;
    title: string;
    studied: boolean;
    deadline: Date;
    createdAt: Date;
    userId?: string;
}

export interface PostTechnologyDTO {
    title: string;
    deadline: Date;
}