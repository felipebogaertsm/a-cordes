// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

// Utils:
import { getClient } from "../../utils/axios"

export async function verifyToken(token) {
    return await getClient().post(`/api/accounts/token/verify/`, {
        token: token,
    })
}
