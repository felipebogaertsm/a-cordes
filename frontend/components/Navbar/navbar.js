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
                    h-16 px-2 md:px-4 border-b-2 border-white select-none
                    whitespace-nowrap overflow-x-scroll no-scrollbar
                '
            >
                <NavbarItem to='/'>
                    <h3 className="lowercase">à cordes</h3>
                </NavbarItem>

                <div className='grow'></div>

                <NavbarItem to='/'>
                    <div className="flex flex-row space-x-2">
                        <img
                            src='/icons/violin.svg'
                            className="
                                invert h-4 my-auto
                            "
                        >
                        </img>
                        <p className="my-auto">Makers</p>
                    </div>
                </NavbarItem>

                <NavbarItem to='/cart'>
                    <div className="flex flex-row space-x-2">
                        <img
                            src='/icons/cart.svg'
                            className="
                                invert h-6 my-auto
                            "
                        >
                        </img>
                        <p className="my-auto">Cart</p>
                    </div>
                </NavbarItem>

                <NavbarItem to='/auth/login' onClick={logoutHandler}>
                    <div className="flex flex-row space-x-2">
                        <img
                            src='/icons/user.svg'
                            className="
                                invert opacity-80 h-4 my-auto
                            "
                        >
                        </img>
                        <p className="my-auto">
                            {authenticated ? 'Logout' : 'Login'}
                        </p>
                    </div>
                </NavbarItem>
            </div>
        </div >
    )
}
