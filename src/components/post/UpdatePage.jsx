import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Form } from 'react-bootstrap'


const UpdatePage = () => {
    const navi = useNavigate();
    const [form, setForm] = useState({
        title: '',
        body: ''
    })
    const db = getFirestore(app);
    const params = useParams();
    const { id } = params;
    const getPost = async () => {
        const snapshot = await getDoc(doc(db, 'post', id));
        const post = snapshot.data();
        setForm({ ...post, preTitle: post.title, preBody: post.body });
    }

    const { title, body, preTitle, preBody, email, date } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onReset = () => {
        if (window.confirm('정말로 취소하시겠습니까?')) {
            getPost();
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm('정말로 수정하시겠습니까?')) {
            const post = {email, body, title, date}
            await setDoc(doc(db, 'post', id), post);
            navi(-1);
        }
    }


    useEffect(() => {
        getPost();
    }, [])

    return (
        <div>
            <h1 className='my-5 text-center'>게시글 수정</h1>
            <Row className='justify-content-center'>
                <Col>
                    <Form onReset={onReset} onSubmit={onSubmit}>
                        <Form.Control className='mb-2' value={title} name='title' onChange={onChange} />
                        <Form.Control as='textarea' rows={10} value={body} name='body' onChange={onChange} />
                        <div className='text-center mt-3'>
                            <Button className='px-5 me-2' disabled={title === preTitle && body === preBody} type='submit'>저장</Button>
                            <Button className='px-5' variant='secondary' disabled={title === preTitle && body === preBody} type='reset'>취소</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default UpdatePage
