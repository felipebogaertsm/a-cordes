// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export default function Button({ children, ...props }) {
    return (
        <button className='mx-auto w-full h-14 overflow-hidden'>
            <div
                className='
                bg-stone-200 rounded-lg w-full h-full mx-auto my-auto
                flex content-center border-transparent border-2 
                active:border-stone-800 transition-all duration-100
                text-center uppercase font-semibold
            '
                {...props}
            >
                <div
                    className="w-full h-full my-auto grid place-items-center"
                >
                    {children}
                </div>
            </div>
        </button>
    )
}
