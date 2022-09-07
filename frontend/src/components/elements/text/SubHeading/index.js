// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

export default function SubHeading({ children, ...props }) {
    return (
        <div className="w-full mt-4 mb-2">
            <h3 {...props}>{children}</h3>
        </div>
    )
}
