export interface taskState {
  title: string;
  done: boolean
}

export interface ITask {
  id: string;
  title: string;
  done: boolean;
}

export interface taskStateApi {
  [id: string]: taskState;
}