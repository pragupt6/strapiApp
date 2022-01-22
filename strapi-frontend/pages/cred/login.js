import React, { useState, useEffect, useContext } from "react"
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import HeadDropDown from '@/components/HeadDropDown'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { LoginIcon } from '@heroicons/react/outline'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import AuthContext from '@/context/AuthContext'

export default function Login() {
    console.log('Login Rendered', useContext(AuthContext))
    let { user, error22, login } = useContext(AuthContext)
    console.log('error=>' + error22, user)
    const [ErrMsg, setErrMsg] = useState(false)
    useEffect(() => {
        error22 && setErrMsg(true)
        // error22 = null
    })
    const [show, setShow] = useState(null);
    const [profile, setProfile] = useState(false);
    const schema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('username is required'),
        password: Yup.string()

            .required('password is required')
    })
    const handleInputChange = () => {

    }
    return (
        <div className="container mx-auto xl:px-20 lg:px-20 sm:px-10 md:px-10">
            {/* <Paper elevation={3}> */}
            {ErrMsg && <Alert severity="error" className="mx-auto lg:w-5/12 sm:w-full md:w-full">Incorrect username or password.</Alert>}
            <div className="w-11/12 mx-auto lg:w-5/12 border-blue-600 h-auto flex flex-col border-2 rounded-md text-blue-500 mt-14 p-5 shadow-xl">
                <div className="flex flex-1 justify-center gap-5 mt-14">
                    <div className='text-4xl'>
                        Login
                    </div>
                    <div>
                        <LoginIcon className="block w-10 h-10 mt-1" aria-hidden="true" />
                    </div>
                </div>
                <div className="flex flex-col justify-center flex-1 mx-auto mt-5 mb-5 w-full">
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values) => {
                            //alert(values)
                            // e.preventDefault()
                            // setErrMsg(false)
                            login(values)
                            // console.log(login(values))
                            // login()
                            // console.log(values)
                        }}
                        initialValues={
                            {
                                username: '',
                                password: ''
                            }
                        }
                        validateOnMount={false}
                        validateOnChange={true}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            isValid,
                            errors,
                        }) => (


                            <Form id='myForm' onSubmit={(e) => {
                                //e.preventDefault(); 
                                handleSubmit(e)
                            }}>

                                <div className='mb-6'>
                                    <FormControl className='w-full'>
                                        <TextField
                                            id="outlined-basic"
                                            type='text'
                                            label="User Name"
                                            variant="outlined"
                                            name='username'
                                            autoComplete="current-username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            onKeyUp={handleInputChange}
                                            // error={true}
                                            error={touched.username && !!errors.username}
                                            // isValid={touched.username && !errors.username}
                                            // error
                                            helperText={touched.username && errors.username}
                                        />
                                    </FormControl>
                                </div>
                                <div className='mb-6'>
                                    <FormControl className='w-full'>
                                        <TextField
                                            id="outlined-password-input"
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            name='password'
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            onKeyUp={handleInputChange}
                                            error={touched.password && !!errors.password}
                                            // isValid={touched.username && !errors.username}
                                            // error
                                            helperText={touched.password && errors.password}

                                        />
                                    </FormControl>
                                </div>
                                <div className='flex justify-between mb-6'>
                                    <div>
                                        <FormControlLabel
                                            control={<Checkbox onChange={(e) => { console.log('changed') }} name="RememberMe" />}
                                            label="Remember Me"
                                        />

                                    </div>
                                    <div className='italic mt-2'>
                                        Forgot password?
                                    </div>
                                </div>
                                <div className='flex flex-1 gap-3 justify-center mb-6'>
                                    <Button variant="contained" color="primary" type="submit" className="w-36">
                                        Login
                                    </Button>
                                    <Button variant="contained" className="w-36">
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
