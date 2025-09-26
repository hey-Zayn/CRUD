import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useFormik } from 'formik';
import userSchema from '../Schema/user.schema';
import axiosInstance from '../axios/axiosInstace';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/Slice/UserSlice';

const UpdateUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      image: null
    },
    validationSchema: userSchema,
    onSubmit: async (values, action) => {

      const response = await axiosInstance.put('/update/' + id, values);
      dispatch(updateUser(response.data));
      console.log(response.data);
      await action.resetForm();
    },
  })





  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <div className='w-96 border p-4 rounded-md'>
        <form action="" onSubmit={handleSubmit} >
          <div className='flex flex-col gap-4 mb-4'>

            <div className='space-y-1'>
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="name" placeholder="Please Enter Name" value={values.name} onChange={handleChange} onChangeBlur={handleBlur}

              />
            </div>

            <div className='space-y-1'>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" placeholder="Please Enter Email" value={values.email} onChange={handleChange} onBlur={handleBlur}
                className={errors.email ? 'border-red-500' : " "}
              />
              {
                errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>
              }
            </div>

            <div className='space-y-1'>
              <Label htmlFor="phone">Phone</Label>
              <Input type="text" name='phone' placeholder="Please Enter Phone" value={values.phone} onChange={handleChange} />
            </div>

            <div className='space-y-1'>
              <Label htmlFor="phone">Image</Label>
              <Input type="file" name='image' value={values.image} onChange={handleChange} />
            </div>



          </div>
          <Button className="w-full">Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser