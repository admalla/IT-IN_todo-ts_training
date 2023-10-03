import Grid from "@mui/material/Unstable_Grid2";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../state/Store";
import {authLoginTC} from "../state/reducers/auth-reducer";
import {Navigate} from "react-router-dom";

type FormEmailType = {
    email?: string
    password?: string
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(state => state.auth.isLogin)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormEmailType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 5) {
                errors.password = 'Should be more five symbols';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(authLoginTC(values))
            formik.resetForm()
        }
    })

    if(isLogin) {
      return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <FormControl>
            <FormLabel>
                <p>To log in get registered
                    <a href={'https://social-network.samuraijs.com/'} target={'_blanket'}>Here</a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>

            </FormLabel>
            <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <TextField
                        label="Email"
                        // name="email"
                        // margin="normal"
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // value={formik.values.email}
                        {...formik.getFieldProps('email')} //заменяет вышестоящие поля
                    />
                    {formik.touched.email
                        && formik.errors.email
                        && <span style={{color: "red"}}>{formik.errors.email}</span>}
                    <TextField
                        label="Password"
                        type="password"
                        margin="normal"
                        // name="password"
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // value={formik.values.password}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password
                        && formik.errors.password
                        && <span style={{color: "red"}}>{formik.errors.password}</span>}
                    <FormControlLabel control={<Checkbox
                        // name="rememberMe"
                        // onChange={formik.handleChange}
                        // value={formik.values.rememberMe}
                        {...formik.getFieldProps('rememberMe')}
                    />} label="Remember me"/>
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                </FormGroup>
            </form>
        </FormControl>
    </Grid>
}