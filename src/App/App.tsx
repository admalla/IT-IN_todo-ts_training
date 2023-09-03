import React from 'react';
import {TodoList} from "../TodoList";
import AddItemTask from "../AddItemTask/AddItemTask";
import {AppBar, Button, Container, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Grid from "@mui/material/Unstable_Grid2";
import {useApp} from "./hook/useApp";

export type TypeFilter = "all" | "active" | "completed"
export type TodoListsType = {
    id: string
    title: string
    filter: TypeFilter
}

function App() {
    const {
        tasks,
        todoLists,
        addTask,
        addTodoList,
        removeTask,
        removeTodoList,
        changeTitleTask,
        changeTitleTodoLists,
        onCheckBox,
        changeFilterTodoList
    } = useApp()

    return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            TodoList
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            <Container maxWidth='xl' >
                <Grid container style={{padding: "20px"}} >
                    <AddItemTask addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3} >
                    {todoLists.map(tl => {
                        return <Grid key={tl.id} >
                            <Paper style={{ padding:"10px"}} >
                                <TodoList
                                    id={ tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    filterName={changeFilterTodoList}
                                    addTask={addTask}
                                    onCheckBox={onCheckBox}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    changeTitleTodoLists={changeTitleTodoLists}
                                    changeTitleTask={changeTitleTask}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>

            </Container>
        </div>
    );
}
export default App;