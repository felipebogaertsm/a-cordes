// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export default function Loader({ ...props }) {
    return (
        <div {...props} className='h-full w-full'>
            <img
                className="h-full w-full mx-auto max-w-[100px] animate-spin"
                src='/icons/loader.svg'
            >
            </img>
        </div>
    )
}
