// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useRef, useEffect, useState } from 'react'

// Components:
import { ButtonIconBg } from '..'

export default function FormInput({ type = 'text', value = '', ...props }) {
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const [typeInput, setTypeInput] = useState(type)

    const inputElement = useRef()

    function passwordShowHideHandler(e) {
        if (isPasswordShown) {
            setTypeInput('password')
        } else {
            setTypeInput('text')
        }

        setIsPasswordShown(!isPasswordShown)
    }

    useEffect(() => {
        inputElement.current.value = value
    }, [])

    return (
        <div className='w-full'>
            {props.label && (
                <div>
                    <label>{props.label}</label>
                    <div className="mb-2"></div>
                </div>
            )}
            <div className='flex flex-row space-x-2'>
                <input
                    className='
                    py-2 px-4 rounded-lg bg-stone-200 w-full border-2
                    border-amber-900 border-opacity-0
                    focus:border-opacity-100 transition-all duration-200
                '
                    placeholder={props.placeholder}
                    type={typeInput}
                    ref={inputElement}
                >
                </input>
                {
                    type !== 'password' ? '' :
                        <ButtonIconBg
                            iconPath={`/icons/${isPasswordShown ? "eye_slash" : "eye"}.svg`}
                            onClick={(e) => passwordShowHideHandler(e)}
                        />
                }
            </div>
        </div>
    )
}
