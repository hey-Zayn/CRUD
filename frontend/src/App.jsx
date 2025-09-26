import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AddUser from './Pages/AddUser'
import UpdateUser from './Pages/UpdateUser'
import BasicYup from './Pages/BasicYup'
const App = () => {
  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/create' element={<AddUser />} />
      <Route path='/update/:id' element={<UpdateUser />} />
      <Route path='/basic-yup' element={<BasicYup />} />

    </Routes>
  )
}

export default App 