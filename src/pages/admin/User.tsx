import React, { useState, useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { RootState } from '../../redux'

export interface userAccount {
    _id: string,
    email: string,
    password: string
}

export default function User() {

    const [pages, setPages] = useState<userAccount[]>()
    const userData = useSelector((state: RootState) => state.user)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}getuser`, {
            headers: { Authorization: `Bearer ${userData.token}` }
        })
            .then(res => {
                const newRes = res.data.filter((item: userAccount) => item.email !== process.env.REACT_APP_USER_ADMIN)
                setPages(newRes)
            })
            .catch()
    }, [userData.token])



    const handleDelete = (id: string) => {
        const data = { id }
        axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}removeuser`, {
            data,
            headers: { Authorization: `Bearer ${userData.token}` }
        })
            .then(res => {
                toast(res.data.message)

                setTimeout(() => {
                    window.location.href = '/user'
                }, 1000);
            })
            .catch()
    }


    return (
        <div>
            {
                userData.email === process.env.REACT_APP_USER_ADMIN &&
                <div className="bg-white shadow-md rounded-lg overflow-hidden mt-10 mx-20">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                pages &&
                                pages.map((item: userAccount, index: number) => (
                                    <tr key={index} id={item._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.password}</td>
                                        <td className="px-6 py-4 whitespace-nowrap cursor-pointer"><AiFillDelete onClick={() => handleDelete(item._id)} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>

    )
}
