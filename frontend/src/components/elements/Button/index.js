// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

// Styles:
import styles from "./Button.module.css"

export default function Button({
    children,
    primary = false,
    secondary = false,
    tertiary = false,
    disabled = false,
    ...props
}) {
    return (
        <button
            {...props}
            className={[
                styles.button,
                primary && styles.buttonPrimary,
                secondary && styles.buttonSecondary,
                tertiary && styles.buttonTertiary,
                disabled && styles.disabled,
            ].join(" ")}
        >
            <div className="w-full h-full my-auto grid place-items-center">
                {children}
            </div>
            <div
                className={`
                    bglight absolute top-0 left-0 w-full h-full bg-opacity-60
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
