import React, { useEffect, useState } from 'react'
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


                dispatch(fetchUsers(res.data.user));
            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
    }, [])

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
                            user.map((user, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">{idx + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="text-right"><Avatar>
                                        <AvatarImage src={user.image} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar></TableCell>
                                    <TableCell>
                                        <div className='flex gap-2 justify-end'>
                                            <Button variant="outline">Edit</Button>
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