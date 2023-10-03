import {instance} from "./instance";
import {AuthDataLogin} from "../state/reducers/auth-reducer";
import {TaskGeneralResponseType} from "./TaskAPI";

export const AuthAPI = {
    Auth(loginData: AuthDataLogin) {
        return instance.post<TaskGeneralResponseType<{userId: number}>>('auth/login', loginData)
    },
    me() {
        return instance.get<TaskGeneralResponseType<DataType>>("auth/me")
    },
    logOut() {
      return instance.delete<TaskGeneralResponseType>('auth/login')
    }
}

export type DataType = {
	id: number;
	email: string;
	login: string;
}