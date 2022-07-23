// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

export default function Heading(props) {
    return (
        <div className="py-6 px-4 flex lg:flex-row flex-col space-y-4 lg:space-y-0">
            {props.children}
        </div>
    )
}
