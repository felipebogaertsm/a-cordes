// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export default function NavbarItem(props) {
    return (
        <div
            className='
                bg-opacity-0 cursor-pointer bg-stone-200
                hover:bg-opacity-10 uppercase tracking-wider
                font-light my-auto px-4 py-2 rounded-md
                transition-all duration-100
            '
        >
            <div {...props}>
                {props.children}
            </div>
        </div>
    )
}