export interface taskState {
  title: string;
  done: boolean
}

export interface task {
  id: string;
  title: string;
  done: boolean;
}

export interface taskStateApi {
  [id: string]: taskState;
}