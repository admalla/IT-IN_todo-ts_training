import React, {useState} from "react";

export const useAddItemTask = (onAddItem: (title: string) => void) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() && e.key === 'Enter') {
            onAddItem(title);
            if(title.length < 100) {
                setTitle('');
            }
        } else {
            !error && setError(true)
        }
    }

    const onClickHandler = () => {
        if(title.trim()) {
            onAddItem(title )
            if(title.length < 100) {
                setTitle('')
            }
        } else {
            !error && setError(true)
        }
    }
    return {title, error, onChangeHandler, onKeyPressHandler, onClickHandler}
}