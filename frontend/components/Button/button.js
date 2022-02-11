// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export default function Button({ children, ...props }) {
    return (
        <button
            className={`
                mx-auto w-full h-14 overflow-hidden
                bg-stone-200 rounded-lg my-auto
                flex content-center border-transparent border-2 
                transition-all duration-100
                text-center uppercase font-semibold relative
                hover:border-amber-900
                ${props.disabled ? '' : 'active:border-stone-800'}
            `}
            {...props}
        >
            <div
                className="w-full h-full my-auto grid place-items-center"
            >
                {children}
            </div>
            <div
                className={`
                    bg-white absolute w-full h-full bg-opacity-60
                    ${props.disabled ? 'visible' : 'invisible'}
                `}
            >

            </div>
        </button>
    )
}
