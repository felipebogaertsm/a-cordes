// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { NavbarItem } from "../"

export default function Navbar() {
    return (
        <div>
            <div
                className='
                    flex flex-col lg:flex-row bg-stone-900 text-stone-100
                    h-16 px-4 border-b-2 border-white select-none
                    whitespace-nowrap
                '
            >
                <NavbarItem className='text-2xl lowercase font-bold'>à cordes</NavbarItem>
                <div className='lg:grow'></div>
                <NavbarItem>Products</NavbarItem>
                <NavbarItem>Cart</NavbarItem>
                <NavbarItem>My user</NavbarItem>
            </div>
        </div>
    )
}
