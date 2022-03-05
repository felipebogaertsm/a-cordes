// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Utils:
import { getClient } from "../../utils/axios";

export async function verifyToken(token) {
    const client = getClient()

    return await client.post(
        `/api/accounts/token/verify/`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            token: token,
        },
    )
}
