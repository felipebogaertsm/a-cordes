// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

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
        <button {...props}>
            <div className="w-full h-full my-auto grid place-items-center">
                {children}
            </div>
            <div
                className={`
                    bg-white absolute top-0 left-0 w-full h-full bg-opacity-60
                    ${
                        disabled && (primary || secondary)
                            ? "visible"
                            : "invisible"
                    }
                `}
            ></div>
        </button>
    )
}
