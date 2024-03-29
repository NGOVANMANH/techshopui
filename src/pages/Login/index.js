import { Form, Row, Col, Button, Container, Spinner } from 'react-bootstrap';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as formik from 'formik';
import * as yup from 'yup';

import styles from '../Signup/Signup.module.scss';
import { login } from '../../services/userServices';
import { useContextData } from '../../hooks';
import { toast } from 'react-toastify';

const Login = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        document.title = "Login - Techshop";
    }, [])

    const { Formik } = formik;

    const schema = yup.object().shape({
        email: yup.string().email("Trường này phải là email!").required("Phải nhập trường này!"),
        password: yup.string().max(30, "Quá dài!").required("Phải nhập trường này!"),
    });

    const [isLogining, setIsLogining] = useState(false);

    const { setUser } = useContextData();

    const usenavigate = useNavigate();

    return (
        <Container>
            <Formik
                validationSchema={schema}
                onSubmit={values => {
                    const fetchApi = async () => {
                        if (values.email && values.password) {
                            setIsLogining(true);
                            const response = await login(values);

                            if (response !== 404) {
                                if (response.status === 200) {
                                    localStorage.setItem("token", response.jwt);
                                    setUser({
                                        auth: true,
                                        userInfor: response.data,
                                    })
                                    usenavigate("/");
                                    window.location.reload();
                                }
                                else {
                                    toast.info(response.message);
                                }
                            }

                            setIsLogining(false);
                        }
                    }

                    fetchApi();
                }}
                initialValues={{
                    email: '',
                    password: '',
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) =>
                    <Row>
                        <Col sm={12} style={{ padding: "0" }}>
                            <Form className='bg-white mt-3 mb-3 rounded' noValidate onSubmit={handleSubmit}>
                                <Row className='justify-content-center h2 pt-4 pb-1'>Đăng nhập</Row>
                                <Row className='justify-content-center m-2 fs-5'>
                                    <Form.Group as={Col} md="6" controlId="validationEmail" className={clsx(styles.form)}>
                                        <Form.Label className='text-secondary'>Email đăng kí(*)</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name='email'
                                            placeholder="Email..."
                                            value={values.email}
                                            onChange={handleChange}
                                            isValid={touched.email && !errors.email}
                                            isInvalid={touched.email && errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className="justify-content-center m-2 fs-5">
                                    <Form.Group as={Col} md="6" controlId="validationPassword" className={clsx(styles.form)}>
                                        <Form.Label className='text-secondary'>Mật khẩu(*)</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name='password'
                                            placeholder="Password..."
                                            value={values.password}
                                            onChange={handleChange}
                                            isValid={touched.password && !errors.password}
                                            isInvalid={touched.password && errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className='justify-content-center m-2 fs-5' >
                                    <Col className='d-flex justify-content-center m-2'>
                                        <Button type="submit" size='lg' className='bg-main w-content'
                                            disabled={isLogining}
                                        >
                                            {isLogining ? <Spinner /> : "Đăng nhập"}
                                        </Button>
                                        <Link className='m-2' to={"/forget"}>Quên mật khẩu?</Link>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>

                        <Col className='container bg-white mt-3 mb-3 rounded'>
                            <Row className='justify-content-center h2 pt-4 pb-1'>Chưa có tài khoản</Row>
                            <Row className='justify-content-center m-2 fs-4' >
                                <Col>
                                    Đăng ký là thành viên để hưởng nhiều lợi ích và đặt mua hàng dễ dàng hơn.
                                    <Link className='m-2 text-success' to={'/signup'}>Đăng kí ngay</Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                }
            </Formik>
        </Container>
    );
}

export default Login;
