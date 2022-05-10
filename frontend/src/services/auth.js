// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Constants:
import { TOKEN_NAME } from "../constants"
import {
    ACCOUNTS_TOKEN_VERIFY_PATH,
    ACCOUNTS_MY_USER_PATH,
} from "../constants/apis"
import { LOGIN_PAGE_ROUTE, HOME_PAGE_ROUTE } from "../constants/routes"

// Services:
import { getClient } from "../utils/axios"

export async function getMyUser(ctx) {
    const client = getClient(ctx)
    return await client.get(ACCOUNTS_MY_USER_PATH)
}

export async function verifyAuth(ctx) {
    const client = getClient(ctx)
    return await client.post(ACCOUNTS_TOKEN_VERIFY_PATH, {
        token: ctx.req.cookies[TOKEN_NAME],
    })
}

export async function privateRoute(ctx) {
    try {
        await verifyAuth(ctx)

        return {
            props: {},
        }
    } catch (err) {
        return {
            props: {},
            redirect: {
                destination: LOGIN_PAGE_ROUTE,
                permanent: false,
            },
        }
    }
}

export async function publicRoute(ctx) {
    try {
        await verifyAuth(ctx)

        return {
            props: {},
            redirect: {
                destination: HOME_PAGE_ROUTE,
                permanent: false,
            },
        }
    } catch (err) {
        return {
            props: {},
        }
    }
}
