import {v1} from "uuid";
import {taskReducer, TasksType} from "./task-reducer";
import {removeTodoListAC} from "./todoList-reducer";

test("remove all tasks by id todoList", () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const tasks: TasksType = {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "JSX", isDone: true},
            {id: v1(), title: "Next", isDone: false},
        ]
    }

    const endTasks = taskReducer(tasks, removeTodoListAC(todoListId2))

    expect(Object.keys(endTasks).length).toBe(1)
    expect(endTasks[todoListId2]).toBeUndefined()
})