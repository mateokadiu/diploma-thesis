export interface Task {
  _id?: string;
  userId?: string;
  start: Date;
  end: Date;
  from: string;
  title: string;
  color: {
    primary: string;
    secondary: string;
  };
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  status?: string;
  draggable?: boolean;
  description: string;
  to: string;
}
