import React from 'react'
import { useFormik } from 'formik';
import BasicYupSchema from '../Schema/BasicYupSchema';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const BasicYup = () => {
  const { values, errors, handleChange, handleSubmit } = useFormik({

    initialValues: {
      name: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: ""
    },
    validateionSchema: BasicYupSchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    }

  });
  // console.log(errors);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div>
        <div className='w-96 border border-gray-200 p-4 rounded '>
          <h1 className='w-full  text-left mb-6 text-xl '>Baisc Yup Form</h1>
          <form action="" onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor="name">Name</Label>
              <Input type='text' name="name" value={values.name} onChange={handleChange} placeholder="Please Enter Name" className={errors.name ? "border-red-500" : ""} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor="email">Email</Label>
              <Input type='email' name="email" value={values.email} onChange={handleChange} placeholder="Please Enter Email" className={errors.email ? "border-red-500" : ""} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor="age">Age</Label>
              <Input type='number' name="age" value={values.age} onChange={handleChange} placeholder="Please Enter Age" className={errors.age ? "border-red-500" : ""} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor="password">Password</Label>
              <Input type='password' name="password" value={values.password} onChange={handleChange} placeholder="Please Enter Password" className={errors.password ? "border-red-500" : ""} />
            </div>

            <div className='space-y-2'>
              <Label htmlFor="confirmPassword">ConfirmPassword</Label>
              <Input type='password' name="confirmPassword" value={values.confirmPassword} onChange={handleChange} placeholder="Please Enter Password Again" className={errors.confirmPassword ? "border-red-500" : ""} />
            </div>

            <Button type='submit' className='w-full mt-4'>Submit</Button> 

          </form>
        </div>
      </div>
    </div>
  )
}

export default BasicYup