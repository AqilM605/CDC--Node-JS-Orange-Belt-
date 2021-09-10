import * as mongoose from "mongoose";
import { Model } from "mongoose";

export interface TodoInterface {
  id?: number;
  description: string;
  deadline: Date;
  done: boolean;
  imagePath?: string;
}

const todoSchema = new mongoose.Schema<TodoInterface>(
  {
    description: {
      type: String,
      required: true,
      max: 150,
    },
    deadline: {
      type: Date,
      required: true,
    },

    done: {
      type: Boolean,
      required: true,
    },
    imagePath: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<TodoInterface, Model<any>>("Todo", todoSchema);
