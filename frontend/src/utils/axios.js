// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import axios from "axios"
import cookie from "js-cookie"

// Constants:
import { BACKEND_URL, TOKEN_NAME } from "../constants"

export function getClient(ctx) {
    const client = axios.create({ baseURL: BACKEND_URL })

    const token = cookie.get(TOKEN_NAME)
        ? cookie.get(TOKEN_NAME)
        : ctx
        ? ctx.req.cookies[TOKEN_NAME]
        : undefined

    if (token) {
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }

    return client
}
