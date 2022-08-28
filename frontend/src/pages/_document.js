// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    ></link>
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    ></link>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap"
                        rel="stylesheet"
                    ></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
