import React, {ChangeEvent, useState} from 'react';
import {useEditableTitle} from "./hook/useEditableTitle";

type PropsType = {
    title: string
    callBack: (title: string) => void
}

const EditableTitle = React.memo(function (props: PropsType) {

    const {
        isEditTitle,
        titleTodoLIst,
        changeValue,
        onDoubleClickHandler,
        offDoubleClickHandler
    } = useEditableTitle(props.title, props.callBack)

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
})

export default EditableTitle;