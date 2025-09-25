import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const AddUser = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [image, setImage] = React.useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ name, email, phone, image });
    }

    return (
        <div className='flex justify-center items-center h-screen w-full'>
            <div className='w-96 border p-4 rounded-md'>
                <form action="" onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4 mb-4'>
                        <div className='space-y-1'>
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" name='name' value={name} onChange={e => setName(e.target.value)} placeHolder="Please Enter Name" />
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" name='email' value={email} onChange={e => setEmail(e.target.value)} placeHolder="Please Enter Email"/>
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor="phone">Phone</Label>
                            <Input type="text" name='phone' value={phone} onChange={e => setPhone(e.target.value)} placeHolder="Please Enter Phone"/>
                        </div>

                        <div className='space-y-1'>
                            <Label htmlFor="phone">Image</Label>
                            <Input type="file" name='image' value={image} onChange={e => setImage(e.target.file)} />
                        </div>



                    </div>
                    <Button className="w-full">Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default AddUser