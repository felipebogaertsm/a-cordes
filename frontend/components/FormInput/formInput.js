// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export default function FormInput(props) {
    return (
        <div className='w-full'>
            {props.label && (
                <div>
                    <label>{props.label}</label>
                    <div className="mb-2"></div>
                </div>
            )}
            <input
                className='
                    py-2 px-4 rounded-lg bg-stone-200 w-full
                '
                placeholder={props.placeholder}
                type={!props.type ? 'text' : props.type}
            >
            </input>
        </div>
    )
}
