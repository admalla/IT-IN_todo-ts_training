import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack: (title: string) => void
}

function EditableTitle(props: PropsType) {
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [titleTodoLIst, setTitleTodoList] = useState<string>('')

    const onDoubleClickHandler = () => {
        setIsEditTitle(true)
        setTitleTodoList(props.title)
    }
    const offDoubleClickHandler = () => {
        setIsEditTitle(false)
        props.callBack(titleTodoLIst)
    }
    const changeValue = (e: ChangeEvent<HTMLInputElement>) =>  setTitleTodoList(e.currentTarget.value)

    return (
            isEditTitle
            ? <input
                    value={titleTodoLIst}
                    onChange={changeValue}
                    onBlur={offDoubleClickHandler}
                    autoFocus
                />
            : <span style={{fontWeight: "bold"}} onDoubleClick={onDoubleClickHandler}>
                {props.title}
            </span>
)
}

export default EditableTitle;