import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type TypeFilter = "all" | "active" | "completed"

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
            default :
                return tasks
        }
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    const  removeTask = (id: number) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== id))
    }

    return (
        <div className="App">
            <TodoList
                title="learn JS"
                tasks={filteredTasks}
                removeTask={removeTask}
                filterName={filterName}
            />
        </div>
    );
}

export default App;
