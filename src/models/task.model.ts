import mongoose, { model, Schema, Types } from "mongoose";

export interface EventColor {
  primary: string;
  secondary: string;
}

export interface CalendarTaskDocument extends Document {
  userId?: string;
  start: Date;
  end?: Date;
  title: string;
  color?: EventColor;
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
}

const taskSchema = new Schema({
  userId: {
    required: true,
    type: Types.ObjectId,
    ref: "User",
  },
  start: {
    required: true,
    type: Date,
  },
  end: {
    required: false,
    type: Date,
  },
  title: {
    type: String,
    required: true,
  },
  color: {
    type: Object,
    required: true,
  },
  allDay: {
    type: Boolean,
    required: false,
  },
  resizable: {
    type: Object,
    required: false,
  },
});

const TaskModel = model<CalendarTaskDocument>("Task", taskSchema);

export default TaskModel;
