import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {  useDispatch } from 'react-redux'
import { PostUser } from '../redux/Slice/UserSlice'
import { toast } from "sonner"
import axiosInstance from '../axios/axiosInstace'

const AddUser = () => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [image, setImage] = React.useState(null)
    const [preview, setPreview] = React.useState('')

    const dispatch = useDispatch();

    // Handle image selection with preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    }

    // Clear preview when component unmounts
    React.useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!name || !email || !phone) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            if (image) {
                formData.append('image', image);
            }

            // Send request with proper headers for file upload
            const response = await axiosInstance.post('/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            console.log(response.data.user);
            
            dispatch(PostUser(response.data.user));
            
            // Reset form
            setName('');
            setEmail('');
            setPhone('');
            setImage(null);
            setPreview('');
            
            // Clear file input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.value = '';
            }
            
            toast.success("User Added Successfully");
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error("Failed to add user. Please try again.");
        }
    }

    return (
        <div className='flex justify-center items-center h-screen w-full'>
            <div className='w-96 border p-4 rounded-md'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4 mb-4'>
                        {/* Name Field */}
                        <div className='space-y-1'>
                            <Label htmlFor="name">Name *</Label>
                            <Input 
                                type="text" 
                                name='name' 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                placeholder="Please Enter Name" 
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className='space-y-1'>
                            <Label htmlFor="email">Email *</Label>
                            <Input 
                                type="email" 
                                name='email' 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                placeholder="Please Enter Email" 
                                required
                            />
                        </div>

                        {/* Phone Field */}
                        <div className='space-y-1'>
                            <Label htmlFor="phone">Phone *</Label>
                            <Input 
                                type="text" 
                                name='phone' 
                                value={phone} 
                                onChange={e => setPhone(e.target.value)} 
                                placeholder="Please Enter Phone" 
                                required
                            />
                        </div>

                        {/* Image Field */}
                        <div className='space-y-1'>
                            <Label htmlFor="image">Image</Label>
                            <Input 
                                type="file" 
                                name='image' 
                                accept="image/*" 
                                onChange={handleImageChange}
                            />
                            
                            {/* Image Preview */}
                            {preview && (
                                <div className="mt-2">
                                    <img 
                                        src={preview} 
                                        alt="Preview" 
                                        className="w-20 h-20 object-cover rounded-md border"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default AddUser