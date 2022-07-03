export interface Task {
  _id?: string;
  userId?: string;
  start: Date;
  end?: Date;
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
  draggable?: boolean;
  description: string;
  to: {
    email: string;
    _id: string;
  };
}
