import { Request, Response } from "express";
import Task from "../models/Task";
import Project from "../models/Project";

//la route pour le POST /tasks
export const createTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { projectId, title, dueDate } = req.body;

        // Vérifier que le projet existe
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(400).json({ Message: "Project est indisponible" });
        }

        const task = await Task.create({ projectId, title, dueDate });
        res.status(201).json(task);
    } catch (Message) {
        res.status(400).json({ message: "probleme lors de la création " });
    }
};

//la route pour le GET /tasks
export const getTasks = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.query;

        // Si un projectId est fourni, filtrer par projet
        const filter = projectId ? { projectId } : {};
        const tasks = await Task.find(filter);

        res.status(200).json(tasks);
    } catch (Message) {
        res.status(400).json({ message: "probleme pour le filtre" });
    }
};

//Project est indisponible GET /tasks/:id
export const getTaskById = async (req: Request, res: Response): Promise<any> => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ Message: "task est indisponible" });
        }
        res.status(200).json(task);
    } catch (Message) {
        res.status(400).json({ Message: 'id de la task pas trouvé' });
    }
};

//la route pour le PUT /tasks/:id
export const updateTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ Message: "task est indisponible" });
        }
        res.status(200).json(task);
    } catch (Message) {
        res.status(400).json({ message: 'erreur update arp ID ' });
    }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ Message: "Task est indisponible" });
        }
        res.status(200).json({ message: "suppression réussie" });
    } catch (Message) {
        res.status(400).json({ Message: 'probleme lords de la suppression ' });
    }
};

// GET /tasks/due-before
export const filterTasksByDueDate = async (req: Request, res: Response): Promise<any> => {
    try {
        const { date } = req.query;

        // Vérifier que la date est valide
        if (!date || isNaN(Date.parse(String(date)))) {
            return res.status(400).json({ Message: "le format est pas bon voici le format attendu YYYY-MM-DD." });
        }

        const dueDate = new Date(String(date));
        const tasks = await Task.find({ dueDate: { $lt: dueDate } });

        res.status(200).json({message: "Date valode"});
    } catch (Message) {
        res.status(400).json({ Message: 'date error' });
    }
};
