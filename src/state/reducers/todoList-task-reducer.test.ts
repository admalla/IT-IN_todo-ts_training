import {v1} from "uuid";
import {taskReducer, TasksType} from "./task-reducer";
import {removeTodoListAC} from "./todoList-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/TaskAPI";

test("remove all tasks by id todoList", () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const tasks: TasksType = {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New,
                todoListId: todoListId1,
                priority: TaskPriorities.Low,
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                description: ''},
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: todoListId1,
                priority: TaskPriorities.Low,
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                description: ''},
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New,
                todoListId: todoListId1,
                priority: TaskPriorities.Low,
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                description: ''},
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New,
                todoListId: todoListId1,
                priority: TaskPriorities.Low,
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                description: ''},
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: todoListId1,
                priority: TaskPriorities.Low,
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                description: ''}
        ],
        [todoListId2]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New,
                todoListId: todoListId2,
                priority: TaskPriorities.Low,
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                description: ''},
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New,
                todoListId: todoListId2,
                priority: TaskPriorities.Low,
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                description: ''},
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: todoListId2,
                priority: TaskPriorities.Low,
                order: 0,
                deadline: '',
                startDate: '',
                addedDate: '',
                description: ''},
        ]
    }

    const endTasks = taskReducer(tasks, removeTodoListAC(todoListId2))

    expect(Object.keys(endTasks).length).toBe(1)
    expect(endTasks[todoListId2]).toBeUndefined()
})