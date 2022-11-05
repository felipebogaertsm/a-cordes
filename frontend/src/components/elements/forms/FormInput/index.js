// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useRef, useState } from "react"

// Components:
import { ButtonIconBg } from "../../../elements"

export default function FormInput({ label, type = "text", ...props }) {
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const [typeInput, setTypeInput] = useState(type)

    const inputElement = useRef()

    function passwordShowHideHandler(e) {
        if (isPasswordShown) {
            setTypeInput("password")
        } else {
            setTypeInput("text")
        }

        setIsPasswordShown(!isPasswordShown)
    }

    return (
        <div className="w-full">
            {label && (
                <div>
                    <label>{label}</label>
                    <div className="mb-2"></div>
                </div>
            )}
            <div className="flex flex-row space-x-2">
                <input
                    className="
                    py-1.5 px-4 rounded-md bg-stone-200 w-full border-[1px]
                    border-dark border-opacity-50 hover:border-opacity-100
                    focus:border-black transition-all duration-200
                "
                    type={typeInput}
                    ref={inputElement}
                    {...props}
                ></input>
                {type !== "password" ? (
                    ""
                ) : (
                    <ButtonIconBg
                        iconPath={`/icons/${
                            isPasswordShown ? "eye_slash" : "eye"
                        }.svg`}
                        onClick={(e) => passwordShowHideHandler(e)}
                    />
                )}
            </div>
        </div>
    )
}
