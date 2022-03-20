// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// APIs:
import { verifyToken } from "./apis/auth"

// Constants:
import { TOKEN_NAME, INDEX_PATH, LOGIN_PATH } from "../constants"

async function verifyAuth(ctx) {
    // in common to both private and public routes
    const token = ctx.req.cookies[TOKEN_NAME]
    let authenticated = false

    try {
        await verifyToken(token)
        authenticated = true
    } catch (err) {
        // pass
    }

    return authenticated
}

export async function privateRoute(ctx) {
    const authenticated = await verifyAuth(ctx)

    if (!authenticated) {
        return {
            props: {},
            redirect: {
                destination: LOGIN_PATH,
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}

export async function publicRoute(ctx) {
    const authenticated = await verifyAuth(ctx)

    if (authenticated) {
        return {
            props: {},
            redirect: {
                destination: INDEX_PATH,
                permanent: true,
            },
        }
    }

    return {
        props: {},
    }
}