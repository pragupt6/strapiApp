import React, { useState, useEffect, useContext } from "react"
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AuthContext from '@/context/AuthContext'
import { LoginIcon } from '@heroicons/react/outline'
import { UserIcon } from '@heroicons/react/solid'
import Alert from '@material-ui/lab/Alert';
import { API_URL, NEXT_URL } from '@/config/index'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Link from 'next/link'
const loginPage = () => {
    let { user, setLoggedUser } = useContext(AuthContext)
    const router = useRouter()
    const [ErrMsg, setErrMsg] = useState(null)
    const login = async ({ username: identifier, password }) => {
        try {
            console.log(`Login called`)
            const res = await fetch(`${NEXT_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier,
                    password,
                }),
            })
            console.log(res)
            const data = await res.json()
            console.log(data)

            if (res.ok) {
                setErrMsg(null)
                setLoggedUser(data.user)
                // user = data.user
                router.push('/')
            } else {
                setErrMsg(data.message)
            }

        } catch (error) {

        }

    }
    const schema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('username is required'),
        password: Yup.string()
            .required('password is required')
    })
    return (
        <>
            <Header />
            <div className='tw-container tw-mx-auto tw-w-10/12 lg:tw-w-5/12'>
                {ErrMsg && <Alert severity="error" className="tw-mx-auto sm:tw-w-full md:tw-w-full tw-mb-10">{ErrMsg}</Alert>}
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => {
                        login(values)
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
                        <div className="tw-border-2 tw-p-10 tw-shadow-md tw-rounded-xl tw-bg-blue-200">
                            <div className="tw-flex tw-flex-1 tw-justify-center tw-text-blue-700 tw-gap-1.5">
                                <div>

                                    <UserIcon className="tw-block tw-w-10 tw-h-10 tw-mt-1" aria-hidden="true" />
                                </div>
                                <div className='tw-leading-snug tw-text-4xl tw-mb-8'>
                                    Login
                                </div>
                                <div>

                                    <LoginIcon className="tw-block tw-w-10 tw-h-10 tw-mt-1" aria-hidden="true" />

                                </div>
                            </div>

                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group controlId='username' className="tw-mb-6">
                                    <Form.Label>Username or Email</Form.Label>
                                    <Form.Control
                                        type='text'
                                        autoComplete="current-user"
                                        placeholder='Enter Username or Email....'
                                        name={'username'}
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.username && !!errors.username}
                                        // isValid={true}
                                        isValid={touched.username && !errors.username}
                                    ></Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId='password' className="tw-mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        autoComplete="current-password"
                                        placeholder='Enter Password....'
                                        name={'password'}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.password && !!errors.password}
                                        isValid={touched.password && !errors.password}
                                    ></Form.Control>
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="tw-flex tw-flex-1 tw-justify-between">
                                    <Form.Group controlId='remember' className='tw-mb-4'>
                                        <input
                                            type='checkbox'
                                            name={'remember'}
                                        ></input>
                                        <Form.Label
                                            className='ml-2 ml-lg-2 mt-n4 mt-lg-0 mt-sm-n4 tw-text-xs lg:tw-text-base'
                                            style={{ verticalAlign: 'middle' }}
                                        >
                                            Remember Me
                                        </Form.Label>
                                    </Form.Group>
                                    <div className='tw-mt-0.5 tw-text-xs lg:tw-text-base tw-italic'>Forgot password?</div>
                                </div>
                                <Button type='submit' variant='primary'>
                                    Sign In
                                </Button>
                                <Link href='/auth/singup' ><a className='tw-ml-4'>Register</a></Link>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default loginPage
