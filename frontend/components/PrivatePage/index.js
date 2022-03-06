// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useRouter } from "next/router"
import { useContext } from "react"

// Components:
import {
    Button,
    Loader,
} from '../../components'

// Constants:
import { LOGIN_PATH } from "../../constants"

// Contexts:
import { AuthContext } from "../../contexts/auth"

export default function PrivatePage({ children, ...props }) {
    const { authenticated, loading, error } = useContext(AuthContext)

    const router = useRouter()

    return (
        <div {...props}>
            {(authenticated && !loading && !error) ? (
                <div>
                    {children}
                </div>
            ) : loading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <div className="py-40 px-4 text-stone-600">
                    <div className="flex flex-col items-center space-y-4">
                        <h3>Please login to access this page.</h3>
                        <div></div>
                        <div className='w-min'>
                            <Button primary onClick={(e) => router.push(LOGIN_PATH)}>
                                Login
                            </Button>
                        </div>
                    </div >
                </div >
            )
            }
        </div >
    )
}
