import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AddUser from './Pages/AddUser'
import UpdateUser from './Pages/UpdateUser'
const App = () => {
  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/create' element={<AddUser />} />
      <Route path='/update/:id' element={<UpdateUser />} />

    </Routes>
  )
}

export default App