// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import Head from "next/head"

import "../styles/globals.css"
import { AuthProvider } from "../contexts/auth"
import { storeWrapper } from "../redux/store"

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>à cordes</title>
            </Head>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    )
}

export default storeWrapper.withRedux(MyApp)
