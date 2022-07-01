import { Types } from "mongoose";
import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import UserModel, { User } from "./user.model";

export interface EventColor {
  primary: string;
  secondary: string;
}

export interface CalendarTaskDocument {
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
  description: string;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Task {
  @prop({ required: true, type: Types.ObjectId })
  userId!: Ref<User, Types.ObjectId>;

  @prop({
    required: true,
    type: Date,
  })
  start!: Date;

  @prop({
    required: true,
    type: Date,
  })
  end!: Date;

  @prop({ minlength: 3, type: String, required: true })
  title!: string;

  @prop({ type: Object, required: true })
  color!: Object;

  @prop({ type: Boolean, required: false })
  allDay!: boolean;

  @prop({ type: Object, required: false })
  resizable!: Object;

  @prop({ type: String, required: true })
  description!: string;
}

const TaskModel = getModelForClass(Task);

export default TaskModel;
