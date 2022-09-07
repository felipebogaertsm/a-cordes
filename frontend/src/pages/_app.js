// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import App from "next/app"
import Head from "next/head"

import "../styles/globals.css"
import { AuthProvider } from "contexts/auth"
import { storeWrapper } from "redux/store"

// Services:
import { getMyUser } from "services/auth"

function MyApp({ Component, ...pageProps }) {
    const { user } = pageProps

    return (
        <>
            <Head>
                <title>à cordes</title>
            </Head>
            <AuthProvider user={user}>
                <Component />
            </AuthProvider>
        </>
    )
}

MyApp.getInitialProps = async (ctx) => {
    const pageProps = await App.getInitialProps(ctx)

    try {
        const { data: user } = await getMyUser(ctx.ctx)
        return { user: { ...user }, ...pageProps }
    } catch (err) {
        return { user: null, ...pageProps }
    }
}

export default storeWrapper.withRedux(MyApp)
