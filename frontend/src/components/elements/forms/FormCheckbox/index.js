// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

export default function FormCheckbox({ ...props }) {
    return (
        <div className="form-check">
            <input
                {...props}
                type="checkbox"
                className="
                    form-check-input appearance-none h-4 w-4 p-2 border border-stone-300 rounded-sm
                    bglight checked:bg-amber-900 checked:border-amber-900 focus:outline-none
                    transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain
                    float-left mr-2 cursor-pointer pointer-events-auto
                "
            />
        </div>
    )
}
