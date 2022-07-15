// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

export default function Card(props) {
    return (
        <div {...props}>
            <div
                className="
                w-full shadow-xl rounded-md bg-stone-200
                hover:brightness-105 hover:bg-opacity-50 transition-all
                duration-100 border-b-4 border-opacity-60
                hover:border-opacity-80
            "
            >
                {props.children}
            </div>
        </div>
    )
}
