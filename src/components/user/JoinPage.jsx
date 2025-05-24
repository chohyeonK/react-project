import { useState } from 'react'
import { Col, Row, Card, Form, Button } from 'react-bootstrap'
import { app } from '../../firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const JoinPage = () => {
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();

    const [form, setForm] = useState({
        email: 'green@inha.com',
        pass: '12341234'
    })

    const { email, pass } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (email === '' || pass === '') {
            alert('이메일 or 패스워드를 입력하세요!')
        } else {
            // 회원가입
            if (window.confirm('정말 회원가입 하시겠습니까?')) {
                setLoading(true)
                createUserWithEmailAndPassword(auth, email, pass)
                .then(success => {
                    setLoading(false);
                    alert('회원가입 성공');
                    navi('/login')
                })
                .catch(err => {
                    setLoading(false);
                    alert('회원가입 에러: ' + err.message);
                })
            }
        }
    }

    if (loading) return <h1 className='my-5 text-center'>로딩중.....</h1>

    return (
        <div>
            <Row className='my-5 justify-content-center'>
                <Col lg={4} md={6} xs={8}>
                    <Card>
                        <Card.Header>
                            <h5>회원가입</h5>

                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Control className='mb-2'
                                    value={email} name='email'
                                    onChange={onChange} />
                                <Form.Control className='mb-2'
                                    value={pass} name='pass' type='password'
                                    onChange={onChange} />
                                <Button className='w-100' type='submit'>회원가입</Button>
                            </Form>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </div>
    )
}

export default JoinPage
