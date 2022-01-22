import React, { useContext } from 'react'
// import Header from '@/components/Header'
import { UserAddIcon } from '@heroicons/react/solid'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Alert from '@material-ui/lab/Alert';
import { API_URL, NEXT_URL } from '@/config/index'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Link from 'next/link'
import AuthContext from '@/context/AuthContext'
import { Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap'

const SingupPage = () => {
    const { register } = useContext(AuthContext)
    const schema = Yup.object().shape({
        email: Yup.string()
            .min(5, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Email is required')
            .matches(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/, 'Invalid email'),
        password: Yup.string()
            .required('password is required')
            .min(5, "Too short!"),
        confirmpassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        firstname: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Invalid name')
            .max(40, "Too Long!")
            .required('First Name is required'),
        lastname: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Invalid last name')
            .max(40, "Too Long!")
            .required('Last Name is required'),
        mobile: Yup.string()
            .required('Mobile Number is required')
            // .matches(/^[0-9]+$/, '10 digit Indian mobile number only')
            .length(10, '10 digit Indian mobile number only')
    })
    return (
        <>
            <Header />
            <div className='tw-container tw-mx-auto tw-w-10/12 lg:tw-w-5/12'>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, { setSubmit }) => {
                        console.log(values)
                        register(values)
                    }}
                    initialValues={
                        {
                            email: '',
                            password: '',
                            confirmpassword: '',
                            firstname: '',
                            lastname: '',
                            mobile: ''
                        }
                    }
                    validateOnMount={false}
                    validateOnChange={true}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        resetForm,
                        values,
                        touched,
                        isValid,
                        errors,
                        isSubmitting
                    }) => (
                        <div className="tw-border-2 tw-p-10 tw-shadow-md tw-rounded-xl tw-bg-blue-200">
                            <div className="tw-flex tw-flex-1 tw-justify-center tw-text-blue-700 tw-gap-1.5">
                                <div>

                                    <UserAddIcon className="tw-block tw-w-10 tw-h-10 tw-mt-1" aria-hidden="true" />
                                </div>
                                <div className='tw-leading-snug tw-text-4xl tw-mb-2'>
                                    Sign Up
                                </div>
                                <div>

                                    {/* <LoginIcon className="tw-block tw-w-10 tw-h-10 tw-mt-1" aria-hidden="true" /> */}

                                </div>
                            </div>
                            {/* Form starts here - 2 column Bootstrap layout */}
                            <div>
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Row>
                                        <Form.Group controlId='email' className="tw-mb-3 tw-w-full">
                                            <Form.Label>Email</Form.Label>
                                            <InputGroup hasValidation>
                                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                                <Form.Control
                                                    type='text'
                                                    autoComplete="current-email"
                                                    placeholder='Enter your email....'
                                                    name={'email'}
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.email && !!errors.email}
                                                    isValid={!errors.email}
                                                // isValid={touched.email && !errors.email}
                                                ></Form.Control>
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </InputGroup>

                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col className='p-0 tw-mr-2'>
                                            <Form.Group controlId='password' className="tw-mb-3 tw-w-full">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type='password'
                                                    autoComplete="current-password"
                                                    placeholder='Enter password....'
                                                    name={'password'}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.password && !!errors.password}
                                                    // isValid={true}
                                                    isValid={touched.password && !errors.password}
                                                ></Form.Control>
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col className='p-0'>

                                            <Form.Group controlId='confirmpassword' className="tw-mb-3 tw-w-full">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control
                                                    type='password'
                                                    autoComplete="current-password"
                                                    placeholder='Confirm password....'
                                                    name={'confirmpassword'}
                                                    value={values.confirmpassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.confirmpassword && !!errors.confirmpassword}
                                                    // isValid={true}
                                                    isValid={touched.confirmpassword && !errors.confirmpassword}
                                                ></Form.Control>
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.confirmpassword}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                    </Row>


                                    <div className="row">
                                        <div className="col p-0 tw-mr-2">
                                            <Form.Group controlId='firstname' className="tw-mb-3">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    autoComplete="current-password"
                                                    placeholder='First Name....'
                                                    name={'firstname'}
                                                    value={values.firstname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.firstname && !!errors.firstname}
                                                    // isValid={true}
                                                    isValid={touched.firstname && !errors.firstname}
                                                ></Form.Control>
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.firstname}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className="col p-0">
                                            <Form.Group controlId='lastname' className="tw-mb-3 tw-w-full">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    autoComplete="current-password"
                                                    placeholder='Last Name....'
                                                    name={'lastname'}
                                                    value={values.lastname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.lastname && !!errors.lastname}
                                                    // isValid={true}
                                                    isValid={touched.lastname && !errors.lastname}
                                                ></Form.Control>
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.lastname}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row tw-mb-6">
                                        <Form.Group controlId='mobile' className="tw-mb-3 tw-w-full">
                                            <Form.Label>Mobile</Form.Label>
                                            <Form.Control
                                                type='number'
                                                autoComplete="current-mobile"
                                                placeholder='10 digit Indian mobile number(WhatsApp number works best)'
                                                name={'mobile'}
                                                value={values.mobile}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.mobile && !!errors.mobile}
                                                // isValid={true}
                                                isValid={touched.mobile && !errors.mobile}
                                            ></Form.Control>
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.mobile}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="tw-flex tw-flex-1">
                                        <div className="tw--ml-3 tw-flex tw-flex-1 tw-gap-4 tw-justify-items-start tw-justify-start tw-w-1/2">
                                            <div>
                                                <Button disabled={isSubmitting} type='submit' variant='primary' className='tw-w-20'>
                                                    Register
                                                </Button>
                                            </div>
                                            <div>
                                                <Button type="reset" onClick={resetForm} variant='secondary' className='tw-w-20'>
                                                    Reset
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='tw-italic tw-leading-9'>Have an account. Please&nbsp;<Link href='/auth/login'>Login</Link> </span>
                                        </div>
                                    </div>
                                    {/* <Row>
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <Button type='submit' variant='primary' className='tw-w-20'>
                                                        Register
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button type="reset" onClick={resetForm} variant='secondary' className='tw-w-20'>
                                                        Reset
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        Already have an account. Please&nbsp;<Link href='/auth/login'>Login</Link>
                                    </Row> */}
                                </Form>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default SingupPage
