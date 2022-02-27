// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export default function Button({
    children,
    primary = false,
    secondary = false,
    tertiary = false,
    disabled = false,
    ...props
}) {
    if (!(primary || secondary || tertiary)) {
        primary = true
    }

    return (
        <button
            className={`
                mx-auto w-full py-3 overflow-hidden
                rounded-lg my-auto flex
                border-transparent border-2 
                transition-all duration-200 px-6
                text-center font-semibold relative
                ${primary && (
                    'bg-stone-800 text-white uppercase content-center hover:bg-stone-700'
                )}
                ${secondary && (
                    'border-2 border-amber-900 bg-stone-100 hover:brightness-[105%] uppercase content-center'
                )}
                ${tertiary && (
                    'hover:underline text-amber-900'
                )}
                ${disabled ? '' : 'active:border-stone-800'}
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
                    bg-white absolute top-0 left-0 w-full h-full bg-opacity-60
                    ${disabled ? 'visible' : 'invisible'}
                `}
            >
            </div>
        </button>
    )
}
