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

async function verifyAuth(ctx) {
    const client = getClient(ctx)

    const token = ctx.req.cookies[TOKEN_NAME]

    try {
        await client.post(ACCOUNTS_TOKEN_VERIFY_PATH, { token: token })
        return true
    } catch (err) {
        return false // user not authenticated
    }
}

export async function getMyUser(ctx) {
    const client = getClient(ctx)

    return await client.get(ACCOUNTS_MY_USER_PATH)
}

export async function privateRoute(ctx) {
    const authenticated = await verifyAuth(ctx)

    if (!authenticated) {
        return {
            props: {},
            redirect: {
                destination: LOGIN_PAGE_ROUTE,
                permanent: false,
            },
        }
    }

    const { data: user } = await getMyUser(ctx)

    return {
        props: { user: { ...user } },
    }
}

export async function publicRoute(ctx) {
    const authenticated = await verifyAuth(ctx)

    if (authenticated) {
        return {
            props: {},
            redirect: {
                destination: HOME_PAGE_ROUTE,
                permanent: true,
            },
        }
    }

    return {
        props: {},
    }
}
