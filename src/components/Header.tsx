// import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../asset/logo.png";
import { HiOutlineUserCircle } from 'react-icons/hi'
import { BsCartFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { RootState } from '../redux';
import { toast } from 'react-hot-toast'


export default function Header() {

    const userData = useSelector((state: RootState) => state.user)

    const cartData = useSelector((state: RootState) => state.cart.cartItem)
    const userCart = cartData.filter((el) => el.email === userData.email)

    const handleLogout = () => {
        sessionStorage.removeItem('user')
        toast('Logout successfully.')
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    }

    return (
        <header className='fixed shadow-md w-full h-16 z-50 bg-white md:px-[40px] px-4'>
            <div className='flex items-center h-full justify-between'>
                <div className='h-10'>
                    <img className='h-full cursor-pointer' src={logo} alt='' onClick={() => window.location.href = '/'} />
                </div>
                <div className='flex gap-8 items-center text-lg relative'>
                    {
                        userData.email && userData.email === process.env.REACT_APP_USER_ADMIN &&
                        <nav className='flex gap-4'>
                            <Link to='/newproduct'>NewProduct</Link>
                            <span className='cursor-pointer' onClick={() => window.location.href = '/invoice'}>Invoice</span>
                            <span className='cursor-pointer' onClick={() => window.location.href = '/user'}>User</span>
                        </nav>
                    }



                    <div className='relative text-slate-600'>
                        <div onClick={() => window.location.href = '/cart'} className='cursor-pointer'>
                            <BsCartFill />
                            {
                                userData.email &&
                                <div id='cartNumber' className="absolute -top-2 -right-2 text-white bg-red-500 h-4 w-4 rounded-full text-sm flex items-center justify-center">
                                    {userCart.length}
                                </div>
                            }
                        </div>
                    </div>

                    <div className='text-slate-600'>
                        <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
                            {!userData.email && <Link to='/login'><HiOutlineUserCircle /></Link>}
                            {userData.email &&
                                userData.image ? <img src={userData.image} alt='' className="h-full w-full" onClick={handleLogout} /> : <HiOutlineUserCircle onClick={handleLogout} />
                            }

                        </div>
                    </div>

                    <div className='text-slate-600'>
                        {userData.firstName && <Link to='/' className='cursor-pointer mr-2 -ml-4 capitalize'>{`${userData.lastName} ${userData.firstName}`} </Link>}
                    </div>

                </div>
            </div>
        </header>
    )
}
