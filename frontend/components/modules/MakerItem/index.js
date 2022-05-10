// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Constants:
import { MEDIA_URL } from "../../constants"

export default function MakerItem({ maker }) {
    return (
        <div>
            <div className="flex md:flex-row flex-col space-x-4">
                <img src={`${MEDIA_URL}${maker.picture}`} />
                <div className="my-auto">
                    <h5 className="my-auto">{maker.name}</h5>
                    <p className="my-auto text-sm">
                        <strong>
                            {maker.city}, {maker.country}
                        </strong>
                    </p>
                </div>
                <div className="grow"></div>
            </div>
        </div>
    )
}
