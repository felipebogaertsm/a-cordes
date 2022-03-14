// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Components:
import { FormInput, ButtonIconBg } from "../../components"

export default function searchInput(props) {
    return (
        <div className="my-auto flex flex-row space-x-2">
            <FormInput placeholder="Search products" />
            <ButtonIconBg iconPath="/icons/search.svg" />
        </div>
    )
}
