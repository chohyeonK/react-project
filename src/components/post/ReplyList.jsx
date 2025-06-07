import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import { getFirestore, collection, query, orderBy, where, onSnapshot } from 'firebase/firestore'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'


const ReplyList = ({ pid }) => {
    const db = getFirestore(app);
    const [list, setList] = useState([]);
    const getList = () => {
        const q = query(collection(db, 'reply'), where('pid', '==', pid), orderBy('date', 'desc'));
        onSnapshot(q, snapshot => {
            let rows = [];
            snapshot.forEach(row => {
                rows.push({ id: row.id, ...row.data() });
            })
            setList(rows);
        });
    }
    // 내가 쓴 것만 수정/삭제 가능
    // 댓글 클릭하면 전체 볼수있게

    useEffect(() => {
        getList();
    }, [])

    return (
        <Row className='justify-content-center'>
            <Col md={10}>
                {list.map(reply =>
                    <div>
                        <div>
                            {reply.date} : {reply.email}
                        </div>
                        <div>
                            <p style={{whiteSpace: 'pre-wrap'}}>{reply.contents}</p>
                        </div>
                    </div>

                )}
            </Col>
        </Row>
    )
}

export default ReplyList
