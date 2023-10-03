

const initialState: initialStateType = {
    isInitialized: false,
    status: 'idle',
    error: null
}

export const AppReducer = (state: initialStateType = initialState, action: ActionsAppType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'SET-INITIALIZ':
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        default:
            return state
    }
}

export const setStatusAC = (status: TodolistStatusType) => ({
    type: 'APP/SET-STATUS',
    status
} as const)
export const setErrorAC = (error: string | null) => ({
    type: 'APP/SET-ERROR',
    error
} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'SET-INITIALIZ' as const, isInitialized})

export type TodolistStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type initialStateType = {
    isInitialized: boolean
    status: TodolistStatusType
    error: string | null
}

export type SetStatusAT = {type: "APP/SET-STATUS", status: TodolistStatusType}
export type SetErrorAT = {type: "APP/SET-ERROR", error: string | null}
export type ActionsAppType = SetStatusAT | SetErrorAT | ReturnType<typeof setIsInitializedAC>