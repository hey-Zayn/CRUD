import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axiosInstance from '../axios/axiosInstace';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../redux/Slice/UserSlice';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

const Home = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get('/users');

                console.log(res.data.user);

                dispatch(fetchUsers(res.data.user));
            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
    }, [dispatch]);

    return (
        <div className='flex justify-center items-center h-screen w-full'>
            <div>
                <div className='w-full flex justify-end'>
                    <Link to={'/create'}><Button className='mb-4' >Add User</Button></Link>
                </div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-left">Phone</TableHead>
                            <TableHead className="text-left">Email</TableHead>
                            <TableHead className="text-center">Image</TableHead>
                            <TableHead className="text-right w-[100px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                          Array.isArray(user) && user.map((u) => (
                                <TableRow key={u._id}>
                                    <TableCell className="font-medium">{u._id}</TableCell>
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell>{u.phone}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell className="text-right"><Avatar>
                                        <AvatarImage src={u.image} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar></TableCell>
                                    <TableCell>
                                        <div className='flex gap-2 justify-end'>
                                            <Link to={`/update/` + u._id}>
                                                <Button variant="outline" >
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button variant="destructive">Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Home