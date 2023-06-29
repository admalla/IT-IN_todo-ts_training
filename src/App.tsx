import React, {useState} from 'react';
import {TaskType, TodoList} from "./TodoList";

export type TypeFilter = "all" | "active" | "completed" | "three"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])
    const [filter, setFilter] = useState<TypeFilter>("all")
    const filterName = (str: TypeFilter) => {
        setFilter(str)
    }

    const getFilteredTasks = (tasks: TaskType[], filter: TypeFilter) => {
        switch (filter) {
            case "active" :
                return tasks.filter((task:TaskType) => task.isDone === false)
            case "completed":
                return tasks.filter((task: TaskType) => task.isDone === true)
            case "three":
                return tasks.filter((task: TaskType) => task.id < 4)
            default :
                return tasks
        }
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    const  removeTask = (id: number) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== id))
    }

    const removeAllTasks = () => {
        setTasks([])
    }

    return (
        <div className="App">
            <TodoList
                title="learn JS"
                tasks={filteredTasks}
                removeTask={removeTask}
                filterName={filterName}
                removeAllTasks={removeAllTasks}
            />
        </div>
    );
}
export default App;