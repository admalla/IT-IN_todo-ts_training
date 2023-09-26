import {v1} from "uuid";
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC,
    todoListReducer, TodoListWithFilterType
} from "./todoList-reducer";

let todoListId1: string;
let todoListId2: string;

let todoLists: TodoListWithFilterType[]

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    todoLists = [
        {id: todoListId1, title: "React", filter: 'all', statusTD: 'idle', order: 0, addedDate: ''},
        {id: todoListId2, title: "JavaScript", filter: "all", statusTD: 'idle', order: 0, addedDate: ''}
    ]
})

test("add todoList", () => {

    const todoListId = v1()
    const endTodoList = todoListReducer(todoLists, addTodoListAC('HTML', todoListId))

    expect(endTodoList.length).toBe(3)
    expect(endTodoList[0].title).toBe("HTML")
})

test("remove todoList", () => {

    const endTodoList = todoListReducer(todoLists, removeTodoListAC(todoListId1))

    expect(endTodoList.length).toBe(1)
    expect(endTodoList[0].id).toBe(todoListId2)
})

test("change filter todoList", () => {

    const endTodoList = todoListReducer(todoLists, changeFilterTodoListAC(todoListId1, "active"))

    expect(endTodoList[0].filter).toBe('active')
    expect(endTodoList[1].filter).toBe('all')
})

test("change title todoList", () => {

    const endTodoList = todoListReducer(todoLists, changeTitleTodoListAC(todoListId1, "What is up"))

    expect(endTodoList[0].title).toBe("What is up")
    expect(endTodoList[1].filter).toBe('all')
})