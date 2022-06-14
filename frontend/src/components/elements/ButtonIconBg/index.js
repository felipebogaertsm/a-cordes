// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export default function buttonIconBg({ iconPath, ...props }) {
    return (
        <div
            className="
                bg-stone-300 rounded-md w-14 h-10 mx-auto my-auto
                flex content-center border-transparent border-2 group
                active:border-amber-900 transition-all duration-100
            "
            {...props}
        >
            <button className="mx-auto" type="button">
                <img
                    className="
                        w-5 h-5 group-hover:scale-110 transition-all duration-100
                    "
                    src={iconPath}
                ></img>
            </button>
        </div>
    )
}
