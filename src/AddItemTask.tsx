import React, {useState} from 'react';
import {Button, Stack, TextField} from "@mui/material";

type AddItemTaskPropsType = {
    addItem: (title: string) => void
}

function  AddItemTask(props: AddItemTaskPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() && e.key === 'Enter') {
            props.addItem(title);
            setTitle('');
        } else {
            setError(true)
        }
    }

    const onClickHandler = () => {
        if(title.trim()) {
            props.addItem(title )
            setTitle('')
        } else {
            setError(true)
        }
    }

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
                <Button style={{ marginLeft: '10px' }} variant={"contained"} size={"small"} onClick={onClickHandler}>+</Button>

            <div style={{color: "red"}}>{error ? error : ''}</div>
        </div>
    );
}

export default AddItemTask;