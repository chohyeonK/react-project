import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { app } from '../../firebase'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { Row, Col, Card, Button } from 'react-bootstrap'
import ReplyPage from './ReplyPage'

const ReadPage = () => {
    const navi = useNavigate();
    const login = sessionStorage.getItem('email');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const { id } = params;
    const [post, setPost] = useState({
        id: '',
        title: '',
        body: '',
        date: '',
        email: ''
    })
    const { title, body, date, email } = post;
    const db = getFirestore(app);
    const getPost = async () => {
        setLoading(true);
        const snapshot = await getDoc(doc(db, 'post', id));
        console.log(snapshot.data())
        setPost(snapshot.data());
        setLoading(false);
    }

    const onDelete = async () => {
        if (window.confirm(`${id}번 게시글을 삭제하시겠습니까?`)) {
            await deleteDoc(doc(db, 'post', id));
            navi(-1);
        }
    }


    useEffect(() => {
        getPost();
    }, [])

    if (loading) return <h1 className='my-5 text-center'>로딩중...</h1>

    return (
        <div>
            <h1 className='my-5 text-center'>게시글 정보</h1>
            {login === email &&
                <Row className='justify-content-center mb-2'>
                    <Col md={10} className='text-end'>
                        <Button size='sm' variant='outline-success' className='mx-2' onClick={() => navi(`/post/update/${id}`)}>수정</Button>
                        <Button size='sm' variant='outline-danger' className='' onClick={onDelete}>삭제</Button>
                    </Col>
                </Row>
            }
            <Row className='justify-content-center'>
                <Col md={10}>
                    <Card>
                        <Card.Body>
                            <h5>{title}</h5>
                            <hr />
                            <p style={{ whiteSpace: 'pre-wrap' }}>{body}</p>
                        </Card.Body>
                        <Card.Footer>
                            Posted on {date} by {email}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <ReplyPage id={id} />
        </div>
    )
}

export default ReadPage
