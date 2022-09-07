// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useRouter } from "next/router"
import { useEffect } from "react"

// Components:
import { Loader } from "components/elements/misc"
import { Heading, Message } from "components/elements/text"
import { NavbarPage } from "components/layouts"
import { ListItem } from "components/modules/generic"
import { MakerItem } from "components/modules/makers"

// Constants:
import { ACCOUNTS_SELLERS_PATH } from "constants/apis"
import { MAKER_PAGE_ROUTE } from "constants/routes"

// Hooks:
import { useFetch } from "hooks"

export default function Makers() {
    const router = useRouter()

    const [sellers, doFetch] = useFetch({
        method: "get",
        url: ACCOUNTS_SELLERS_PATH,
    })

    useEffect(() => {
        doFetch()
    }, [])

    return (
        <NavbarPage>
            <div className="py-4">
                <Heading>
                    <h1>Makers</h1>
                </Heading>
            </div>

            <div className="w-full flex flex-col gap-2 mt-8">
                {sellers.loading ? (
                    <div className="w-full mx-auto">
                        <Loader />
                    </div>
                ) : sellers.error ? (
                    <Message>{sellers.error}</Message>
                ) : (
                    sellers.data &&
                    sellers.data.map((maker, index) => (
                        <ListItem
                            key={index}
                            number={index + 1}
                            className="cursor-pointer"
                            onClick={() =>
                                router.push(
                                    MAKER_PAGE_ROUTE.replace(
                                        "[slug]",
                                        maker.slug
                                    )
                                )
                            }
                        >
                            <MakerItem maker={maker} />
                        </ListItem>
                    ))
                )}
            </div>
        </NavbarPage>
    )
}
