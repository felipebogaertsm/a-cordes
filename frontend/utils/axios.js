// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import axios from "axios"

// Constants:
import { BACKEND_URL } from "../constants"

export function getClient() {
    return axios.create({
        baseURL: BACKEND_URL,
    })
}
