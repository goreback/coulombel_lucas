import { Request, Response } from "express";
import Project from "../models/Project";

// la route pour le Post est /projects
export const createProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ message: 'createProject successfully' });
    } catch (message: any) {
        res.status(400).json({ message: message.message });
    }
};

// la route pour le Post est /projects
export const getProjects = async (_req: Request, res: Response) => {
    const projects = await Project.find();
    res.status(200).json({message: 'successful getProjects'});
};

// la route pour le Get est /projects/:id
export const getProjectById = async (req: Request, res: Response): Promise<any> => {
    const project = await Project.findById(req.params.id);
    if (!project) 
        return res.status(404).json({ message: "Le get ne fonctionne pas" });
    res.status(200).json({message: 'successful getProjectById'});
};

//la route pour le PUT est /projects/:id
export const updateProject = async (req: Request, res: Response): Promise<any> => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project)
         return res.status(404).json({ message: "update ne fonctionne pas" });
    res.status(200).json({message: 'successful updateProject'});
};

// la route pour delete est /projects/:id
export const deleteProject = async (req: Request, res: Response): Promise<any> => {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project)
         return res.status(404).json({ message: "le delete ne fonctionne pas" });

    res.status(200).json({ message: "successful deleteProject" });
};

// la route pour le Post est /projects/:id/complete
export const completeProject = async (req: Request, res: Response): Promise<any> => {
    const project = await Project.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true });
    if (!project) 
        return res.status(404).json({ message: "Project est indisponible" });
    res.status(200).json({message: 'successful completeProject'});
};

// la route pour le Get est /projects/by-status
export const filterProjectsByStatus = async (req: Request, res: Response): Promise<any> => {
    const { status } = req.query;
    if (!["planned", "in-progress", "completed"].includes(String(status))) {
        return res.status(400).json({ message: "le status est pas correcte (planifiée, en cours, terminée)." });
    }
    const projects = await Project.find({ status });
    res.status(200).json({message: 'successful filterProjectsByStatus'});
};
