// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export default function Heading(props) {
    return (
        <div className="py-6 px-4 border-b-2 border-black flex lg:flex-row flex-col space-y-4 lg:space-y-0">
            {props.children}
        </div>
    )
}