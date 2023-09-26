import {Dispatch} from "redux";
import {setErrorAC, SetErrorAT, setStatusAC, SetStatusAT} from "../state/reducers/app-reducer";
import {TaskGeneralResponseType} from "../api/TaskAPI";

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorDispatchType>, data: TaskGeneralResponseType<T>) => {
    const err = data.messages[0]
    if(err) {
        dispatch(setErrorAC(err))
    } else {
        dispatch(setErrorAC('Same error'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch<ErrorDispatchType>, error: string) => {
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error))
}

type ErrorDispatchType = SetStatusAT | SetErrorAT