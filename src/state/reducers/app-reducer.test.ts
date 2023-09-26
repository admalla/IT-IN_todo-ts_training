import {v1} from "uuid";
import {AppReducer, initialStateType, setStatusAC} from "./app-reducer";

let todoListId1: string;
let todoListId2: string;

let todoLists: initialStateType

beforeEach(() => {

    todoLists = {
        status: 'idle',
        error: "eroorrrrrr"
    }
})

test("add todoList", () => {

    const todoListId = v1()
    const endTodoList = AppReducer(todoLists, setStatusAC('loading'))

    expect(endTodoList.status).toBe('loading')
})

