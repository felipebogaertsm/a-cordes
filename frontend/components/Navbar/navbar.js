// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'

// Actions:
import { logout } from "../../redux/actions/userActions"

// Components:
import { NavbarItem } from ".."

export default function Navbar() {
    const dispatch = useDispatch()

    const router = useRouter()

    const [authenticated, setAuthenticated] = useState()

    const { userInfo } = useSelector(state => state.userLogin)

    useEffect(() => {
        if (userInfo) {
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
    }, [userInfo, dispatch, router, dispatch])

    function logoutHandler() {
        dispatch(logout())
    }

    return (
        <div className='w-screen'>
            <div
                className='
                    flex flex-row bg-stone-900 text-stone-100 w-full
                    h-16 px-4 border-b-2 border-white select-none
                    whitespace-nowrap overflow-x-scroll no-scrollbar
                '
            >
                <NavbarItem className='text-2xl lowercase font-bold' to='/'>
                    à cordes
                </NavbarItem>

                <div className='lg:grow'></div>

                <NavbarItem to='/'>Makers</NavbarItem>
                <NavbarItem to='/'>Cart</NavbarItem>

                {authenticated ? (
                    <NavbarItem to='/' onClick={logoutHandler}>
                        Logout
                    </NavbarItem>
                ) : (
                    <NavbarItem to='/auth/login'>
                        Login
                    </NavbarItem>
                )}
            </div>
        </div >
    )
}
