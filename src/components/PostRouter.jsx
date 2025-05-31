import React from 'react'
import ListPage from './post/ListPage'
import { Route, Routes } from 'react-router-dom'
import WritePage from './post/WritePage'


const PostRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/write' element={<WritePage />} />
    </Routes>
  )
}

export default PostRouter
