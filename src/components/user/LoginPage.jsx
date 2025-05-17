import React, { useState } from 'react'
import { Col, Row, Card, Form, Button } from 'react-bootstrap'

const LoginPage = () => {
    const [form, setForm] = useState({
        email: 'blue@inha.com',
        pass: '12341234'
    })

    const {email, pass} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value,
            [e.target.pass] : e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        // 유효성 체크
        if(email == '' || pass == '') {
            alert('이메일 또는 패스워드를 입력하세요.')
        } else {
            // 로그인 체크
        }
    }

    const basename = process.env.PUBLIC_URL
    return (
        <div>
            <Row className='my-5 justify-content-center'>
                <Col lg={4} md={6} xs={8}>
                    <Card>
                        <Card.Header>
                            <h5>로그인</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Control placeholder='email' value={email} name='email' className='mb-2' onChange={onChange} />
                                <Form.Control placeholder='password'type='password' value={pass} name='pass' className='mb-2' onChange={onChange}/>
                                <Button className='w-100' type='submit'>로그인</Button>
                            </Form>
                            <div className='my-2 text-end'>
                                <a href={`${basename}/join`}>회원가입</a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage
