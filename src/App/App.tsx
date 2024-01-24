import React, { useEffect } from "react";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DemoType, TodoListsList } from "components/TodoLists/TodoListsList";
import LinearProgress from "@mui/material/LinearProgress";
import { ErrorSnackbar } from "components/common/ErrorSnackBar";
import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch, useAppSelector } from "state/Store";
import { TodolistStatusType } from "state/reducers/app-reducer";
import { Login } from "components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { logOutTC, meTC } from "state/reducers/auth-reducer";

function App({ demo = false }: DemoType) {
  const statusTodo = useSelector<AppRootState, TodolistStatusType>(
    (state) => state.app.status,
  );
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOutTC());
  };

  useEffect(() => {
    dispatch(meTC());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

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
          {isLogin && (
            <Button onClick={handleLogOut} color="inherit">
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {statusTodo === "loading" && <LinearProgress />}
      <ErrorSnackbar />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<h1>404 not founded</h1>} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/IT-IN_todo-ts_training" element={<TodoListsList demo={demo} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
