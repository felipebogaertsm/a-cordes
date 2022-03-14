// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export default function Heading(props) {
    return (
        <div className="py-6 px-4">
            <h1>{props.children}</h1>
        </div>
    )
}
