import React from 'react';
import {TodoList} from "../components/TodoList";
import AddItemTask from "../AddItemTask/AddItemTask";
import {AppBar, Button, Container, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Grid from "@mui/material/Unstable_Grid2";
import {useApp} from "./hook/useApp";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../components/common/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootState} from "../state/Store";
import {TodolistStatusType} from "../state/reducers/app-reducer";

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

    const statusTodo =
        useSelector<AppRootState, TodolistStatusType>(state => state.app.status)

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
                {statusTodo === 'loading' && <LinearProgress/>}
                <ErrorSnackbar />
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
                                    statusTodo={tl.statusTD}
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