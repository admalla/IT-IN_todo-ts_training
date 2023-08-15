import {v1} from "uuid";
import {TodoListsType} from "../../App";
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC,
    todoListReducer
} from "./todoList-reducer";

test("add todoList", () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const todoLists: TodoListsType[] = [
        {id: todoListId1, title: "React", filter: 'all'},
        {id: todoListId2, title: "JavaScript", filter: "all"}
    ]

    const todoListId = v1()
    const endTodoList = todoListReducer(todoLists, addTodoListAC('HTML', todoListId))

    expect(endTodoList.length).toBe(3)
    expect(endTodoList[0].title).toBe("HTML")
})

test("remove todoList", () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const todoLists: TodoListsType[] = [
        {id: todoListId1, title: "React", filter: 'all'},
        {id: todoListId2, title: "JavaScript", filter: "all"}
    ]


    const endTodoList = todoListReducer(todoLists, removeTodoListAC(todoListId1))

    expect(endTodoList.length).toBe(1)
    expect(endTodoList[0].id).toBe(todoListId2)
})

test("change filter todoList", () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const todoLists: TodoListsType[] = [
        {id: todoListId1, title: "React", filter: 'all'},
        {id: todoListId2, title: "JavaScript", filter: "all"}
    ]


    const endTodoList = todoListReducer(todoLists, changeFilterTodoListAC(todoListId1, "active"))

    expect(endTodoList[0].filter).toBe('active')
    expect(endTodoList[1].filter).toBe('all')
})

test("change title todoList", () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const todoLists: TodoListsType[] = [
        {id: todoListId1, title: "React", filter: 'all'},
        {id: todoListId2, title: "JavaScript", filter: "all"}
    ]


    const endTodoList = todoListReducer(todoLists, changeTitleTodoListAC(todoListId1, "What is up"))

    expect(endTodoList[0].title).toBe("What is up")
    expect(endTodoList[1].filter).toBe('all')
})