import React, { useState } from 'react'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import TextareaAutoSize from 'react-textarea-autosize'
import { app } from '../../firebase'
import { getFirestore, doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore'
import moment from 'moment'
import ReplyList from './ReplyList'
import { useNavigate } from 'react-router-dom'



const RepylyPage = ({id}) => {
    const db = getFirestore(app);
    const email = sessionStorage.getItem('email');
    const[contents, setContents] = useState('');
    const navi = useNavigate();

    const onWrite = async () => {
        const reply = {
            pid: id,
            email,
            contents,
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }
        await addDoc(collection(db, 'reply'), reply);
        setContents('');
    }


    // 로그인 페이지 이동 추가해야 함(전 페이지 이동도)
    const onClickLogin = () => {
        console.log('로그인 버튼 누름')
        sessionStorage.setItem('target', `/post/${id}`);
        navi('/login')
    }

    return (
        <div className='my-5'>
            {email ?
                <Row className='justify-content-center'>
                    <Col md={10}>
                        <TextareaAutoSize onChange={(e) => setContents(e.target.value)} className='textarea' value={contents} placeholder='내용을 입력하세요.'/>
                        <Button  disabled={contents===''} className='px-5 text-end' onClick={onWrite}>등록</Button>
                    </Col>
                </Row>
                :
                <Row className='justify-content-center'>
                    <Col md={10}>
                        <Button className='w-100' onClick={onClickLogin}>로그인</Button>
                    </Col>
                </Row>
            }
            <ReplyList pid={id} />
        </div>
    )
}

export default RepylyPage
