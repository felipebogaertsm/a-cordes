// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

export default function Heading({ children }) {
    return (
        <div className="py-2">
            <h1>{children}</h1>
        </div>
    )
}
