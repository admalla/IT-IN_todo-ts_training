import {v1} from "uuid";
import {
    addNewTaskAC,
    changeCheckBoxTaskAC,
    changeTitleTaskAC,
    removeTaskAC,
    taskReducer,
    TasksType
} from "./task-reducer";

let todoListId1: string;
let todoListId2: string;

let tasks: TasksType;

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    tasks = {
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
})

test("add new task", () => {

    const taskId = v1()
    const endTasks = taskReducer(tasks, addNewTaskAC(todoListId2, taskId, "new Task"))

    expect(endTasks[todoListId2].length).toBe(4)
    expect(endTasks[todoListId2][0].title).toBe("new Task")
})
test("remove task", () => {

    const taskId = tasks[todoListId1][3].id
    const endTasks = taskReducer(tasks, removeTaskAC(todoListId1, taskId))

    expect(endTasks[todoListId1].length).toBe(4)
    expect(endTasks[todoListId1][3].title).not.toBe("HTML")
    expect(endTasks[todoListId1][3].title).toBe("CSS")
})
test("change checkbox task", () => {

    const taskId = tasks[todoListId2][0].id
    const endTasks = taskReducer(tasks, changeCheckBoxTaskAC(todoListId2, taskId))

    expect(endTasks[todoListId2][0].isDone).not.toBe(true)
    expect(endTasks[todoListId2][0].isDone).toBe(false)
})
test("change title task", () => {

    const taskId = tasks[todoListId2][0].id
    const endTasks = taskReducer(tasks, changeTitleTaskAC(todoListId2, taskId, "React"))

    expect(endTasks[todoListId2][0].title).not.toBe("Redux")
    expect(endTasks[todoListId2][0].title).toBe("React")
})