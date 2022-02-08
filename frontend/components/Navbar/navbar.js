// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Components:
import { NavbarItem } from "../"

export default function Navbar() {
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
                <NavbarItem to='/auth/login'>
                    Login
                </NavbarItem>
            </div>
        </div>
    )
}
