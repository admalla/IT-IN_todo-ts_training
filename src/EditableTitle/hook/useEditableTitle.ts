import {ChangeEvent, useState} from "react";

export const useEditableTitle = (title: string, callback: (title: string) => void) => {
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [titleTodoLIst, setTitleTodoList] = useState<string>('')

    const onDoubleClickHandler = () => {
        setIsEditTitle(true)
        setTitleTodoList(title)
    }
    const offDoubleClickHandler = () => {
        setIsEditTitle(false)
        callback(titleTodoLIst)
    }
    const changeValue = (e: ChangeEvent<HTMLInputElement>) =>  setTitleTodoList(e.currentTarget.value)

    return {isEditTitle, titleTodoLIst, changeValue, offDoubleClickHandler, onDoubleClickHandler}
}