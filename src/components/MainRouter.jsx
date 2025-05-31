import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import CartPage from './user/CartPage'
import LoginPage from './user/LoginPage'
import JoinPage from './user/JoinPage'
import PostRouter from './PostRouter'

const MainRouter = () => {
    return (
        <Container>
            <Routes>
                <Route path='/' element={<HomePage />}/>
                <Route path='/cart' element={<CartPage />}/>
                <Route path='/login' element={<LoginPage />}/>
                <Route path='/join' element={<JoinPage />}/>
                <Route path='/post/*' element={<PostRouter />} />
            </Routes>
        </Container>
    )
}

export default MainRouter
