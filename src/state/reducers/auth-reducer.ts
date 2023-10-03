import {AppThunk} from "../Store";
import {AuthAPI} from "../../api/AuthAPI";
import {setIsInitializedAC, setStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: initialState = {
    isLogin: false
}

export const authReducer = (state: initialState = initialState, action: ActionsAuthType): initialState => {
    switch (action.type) {
        case "AUTH-LOGIN":
            return {
                ...state,
                isLogin: action.value
            }
        default:
            return state
    }
}

//...actions

const authLoginAC = (value: boolean) => {
    return {
        type: "AUTH-LOGIN" as const,
        value
    }
}

export const authLoginTC = (data: AuthDataLogin): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        const res = await AuthAPI.Auth(data)
        if(res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(authLoginAC(true))
            dispatch(setStatusAC("success"))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as Error).message)
    }
}

export const logOutTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        const res = await AuthAPI.logOut()
        if(res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(authLoginAC(false))
            dispatch(setStatusAC("success"))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as Error).message)
    }
}

export const meTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setStatusAC("loading"))
        const res = await AuthAPI.me()
        if(res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(authLoginAC(true))
            dispatch(setStatusAC("success"))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as Error).message)
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}


//...types

export type AuthDataLogin = {
    email: string
    password: string
    rememberMe: boolean
}
type initialState = {isLogin: boolean}
export type ActionsAuthType = ReturnType<typeof authLoginAC>
enum RESULT_CODE {
    SUCCESS = 0
}