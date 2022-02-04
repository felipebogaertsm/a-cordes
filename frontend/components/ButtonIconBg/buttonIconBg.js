// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export default function buttonIconBg(props) {
    return (
        <div
            className='
                bg-stone-200 rounded-lg w-12 h-10 mx-auto my-auto
                flex content-center border-transparent border-2 
                active:border-stone-800 transition-all duration-100
            '
            {...props}
        >
            <button className='mx-auto'>
                <img
                    className='
                        w-5 h-5 hover:scale-110 transition-all duration-100
                    '
                    src={props.iconPath}
                >
                </img>
            </button>
        </div>
    )
}
