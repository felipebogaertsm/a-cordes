// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'

// Components:
import { NavbarItem } from ".."

// Contexts:
import { AuthContext } from "../../contexts/auth"

export default function Navbar() {
    const dispatch = useDispatch()

    const { authenticated, logout } = useContext(AuthContext)

    function logoutHandler() {
        logout()
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
                <NavbarItem to='/'>
                    <h3 className="lowercase">à cordes</h3>
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
