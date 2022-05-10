// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useRouter } from "next/router"
import { useEffect } from "react"

// Components:
import { Heading, Loader, Message } from "../../components/elements"
import { NavbarPage } from "../../components/layouts"
import { ListItem, MakerItem } from "../../components/modules"

// Constants:
import { ACCOUNTS_SELLERS_PATH } from "../../constants/apis"
import { MAKER_PAGE_ROUTE } from "../../constants/routes"

// Hooks:
import { useFetch } from "../../hooks"

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
            <div className="px-6 py-14">
                <Heading>
                    <h1>Makers</h1>
                </Heading>

                <div className="mt-20 px-6 w-full flex flex-col space-y-2">
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
                                            "[id]",
                                            maker._id
                                        )
                                    )
                                }
                            >
                                <MakerItem maker={maker} />
                            </ListItem>
                        ))
                    )}
                </div>
            </div>
        </NavbarPage>
    )
}
