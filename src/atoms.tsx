import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface ITodo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: ITodo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    TodoList: [],
    Doing: [],
    "Done😎": [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const TrashCanState = atom<boolean>({
  key: "trashcan",
  default: false,
});
