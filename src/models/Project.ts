//import
import mongoose, { Schema, Document, model } from "mongoose";

//l'interface 
interface IProject extends Document {
  name: string;
  description?: string;
  status: "planned" | "in-progress" | "completed";
  createdAt: Date;
}

//creation du schema
const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["planned", "in-progress", "completed"], default: "planned" },
    createdAt: { type: Date, default: Date.now },
  });

  const Project = model<IProject>("Project", ProjectSchema);

export default Project
