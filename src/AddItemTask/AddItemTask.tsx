import React, {useState} from 'react';
import {Button, Stack, TextField} from "@mui/material";
import {useAddItemTask} from "./hook/useAddItemTask";

type AddItemTaskPropsType = {
    addItem: (title: string) => void
}

const AddItemTask = React.memo((props: AddItemTaskPropsType) => {
    const {
        title,
        error,
        onKeyPressHandler,
        onChangeHandler,
        onClickHandler
    } = useAddItemTask(props.addItem)

    return (
        <div>
            <TextField
                error={error}
                value={title}
                id="standard-basic"
                variant="standard"
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                helperText={error && "Заполните строку!"}
            />
            <Button style={{marginLeft: '10px'}} variant={"contained"} size={"small"}
                    onClick={onClickHandler}>+</Button>

            <div style={{color: "red"}}>{error ? error : ''}</div>
        </div>
    );
})

export default AddItemTask;