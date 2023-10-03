import {AppReducer, initialStateType, setStatusAC} from "./app-reducer";


let todoLists: initialStateType

beforeEach(() => {

    todoLists = {
        isInitialized: false,
        status: 'idle',
        error: "eroorrrrrr"
    }
})

test("add todoList", () => {


    const endTodoList = AppReducer(todoLists, setStatusAC('loading'))

    expect(endTodoList.status).toBe('loading')
})

