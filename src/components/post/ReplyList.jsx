import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import {
    doc,
    updateDoc,
    getFirestore,
    collection,
    query,
    orderBy,
    where,
    onSnapshot,
    deleteDoc,
} from 'firebase/firestore'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import TextareaAutosize from 'react-textarea-autosize'
import moment from 'moment'

const ReplyList = ({ pid }) => {
    const login = sessionStorage.getItem('email')
    const db = getFirestore(app)
    const [list, setList] = useState([])

    const getList = () => {
        const q = query(
            collection(db, 'reply'),
            where('pid', '==', pid),
            orderBy('date', 'desc')
        )
        onSnapshot(q, (snapshot) => {
            const rows = []
            snapshot.forEach((docSnap) => {
                const data = docSnap.data()

                const dateStr = data.date || ''

                rows.push({
                    id: docSnap.id,
                    ...data,
                    ellipsis: true,
                    edit: false,
                    text: data.contents,
                    dateStr,
                })
            })
            setList(rows)
        })
    }

    const onClickUpdate = (id) => {
        const data = list.map((reply) =>
            reply.id === id ? { ...reply, edit: !reply.edit } : reply
        )
        setList(data)
    }

    const onClickContents = (id) => {
        const data = list.map((reply) =>
            reply.id === id ? { ...reply, ellipsis: !reply.ellipsis } : reply
        )
        setList(data)
    }

    const onChageContents = (id, e) => {
        const data = list.map((reply) =>
            reply.id === id ? { ...reply, contents: e.target.value } : reply
        )
        setList(data)
    }

    const onClickCancel = (r) => {
        const data = list.map((reply) =>
            reply.id === r.id ? { ...reply, edit: false, contents: reply.text } : reply
        )
        setList(data)
    }

    const onClickRemove = async (id) => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            try {
                await deleteDoc(doc(db, 'reply', id))
                console.log('데이터 삭제 성공')
            } catch (error) {
                console.error('삭제 중 오류 발생:', error)
            }
        }
    }

    const onClickSave = (id) => async (e) => {
        e.preventDefault()
        if (window.confirm('정말로 수정하시겠습니까?')) {
            const target = list.find((reply) => reply.id === id)
            if (!target) return

            try {
                await updateDoc(doc(db, 'reply', id), {
                    contents: target.contents,
                    date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                })
                const data = list.map((reply) =>
                    reply.id === id
                        ? { ...reply, text: target.contents, edit: false }
                        : reply
                )
                setList(data)
            } catch (error) {
                console.error('댓글 수정 실패:', error)
            }
        }
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <Row className="justify-content-center">
            <Col md={10}>
                {list.map((reply) => (
                    <div key={reply.id} className="my-5">
                        <Row>
                            <Col className="text-muted">
                                {reply.dateStr} : {reply.email}
                            </Col>
                            {reply.email === login && !reply.edit && (
                                <Col className="text-end">
                                    <CiEdit
                                        className="edit"
                                        onClick={() => onClickUpdate(reply.id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <MdDelete
                                        className="delete"
                                        onClick={() => onClickRemove(reply.id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Col>
                            )}
                        </Row>

                        {reply.edit ? (
                            <Form onSubmit={onClickSave(reply.id)}>
                                <TextareaAutosize
                                    className="textarea"
                                    onChange={(e) => onChageContents(reply.id, e)}
                                    value={reply.contents}
                                />
                                <div className="text-end">
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        className="mx-2"
                                        disabled={reply.text === reply.contents}
                                        type="submit"
                                    >
                                        저장
                                    </Button>
                                    <Button
                                        onClick={() => onClickCancel(reply)}
                                        size="sm"
                                        variant="secondary"
                                        type="button"
                                    >
                                        취소
                                    </Button>
                                </div>
                            </Form>
                        ) : (
                            <div
                                onClick={() => onClickContents(reply.id)}
                                style={{ cursor: 'pointer' }}
                                className={reply.ellipsis ? 'ellipsis2' : ''}
                            >
                                <p style={{ whiteSpace: 'pre-wrap' }}>
                                    {reply.contents}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </Col>
        </Row>
    )
}

export default ReplyList
