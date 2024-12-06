import mongoose, { Schema, Document, model } from "mongoose";

interface ITask extends Document {
  projectId: mongoose.Types.ObjectId;
  title: string;
  done: boolean;
  dueDate?: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    dueDate: { type: Date },
  });

  const Task = model<ITask>("Task", TaskSchema);

export default Task
