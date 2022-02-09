// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useRef, useEffect } from 'react'

export default function FormInput({ type = 'text', value = '', ...props }) {
    var isPasswordShown = false
    const inputElement = useRef()
    const imgElement = useRef()

    function passwordShowHideHandler() {
        if (isPasswordShown) {
            inputElement.current.type = 'password'
            isPasswordShown = false
            imgElement.current.src = `${imgElement.current.src}`.replace('eye', 'eye_slash')
        } else {
            inputElement.current.type = 'text'
            isPasswordShown = true
            imgElement.current.src = `${imgElement.current.src}`.replace('eye_slash', 'eye')
        }
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
                    py-2 px-4 rounded-lg bg-stone-200 w-full
                '
                    placeholder={props.placeholder}
                    type={type}
                    ref={inputElement}
                >
                </input>
                {
                    type !== 'password' ? '' :
                        <span
                            className='
                                w-14 p-2 bg-zinc-200 rounded-xl border-solid border-black 
                                flex justify-center cursor-pointer transition-all 
                                duration-200 group
                            '
                            onClick={passwordShowHideHandler}
                        >
                            <img
                                src={`/icons/eye_slash.svg`}
                                className='
                                    place-self-center w-6 group-hover:scale-105 transition-all
                                    duration-200 opacity-70 group-hover:opacity-90
                                '
                                ref={imgElement}
                            ></img>
                        </span>
                }
            </div>
        </div>
    )
}
