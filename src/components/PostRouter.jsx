import React from 'react'
import ListPage from './post/ListPage'
import { Route, Routes } from 'react-router-dom'
import WritePage from './post/WritePage'
import ReadPage from './post/ReadPage'
import UpdatePage from './post/UpdatePage'


const PostRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/write' element={<WritePage />} />
        <Route path='/:id' element={<ReadPage />} />
        <Route path='/update/:id' element={<UpdatePage />} />
    </Routes>
  )
}

export default PostRouter
