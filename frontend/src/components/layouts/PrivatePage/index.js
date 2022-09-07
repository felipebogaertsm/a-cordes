// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useRouter } from "next/router"
import { useContext } from "react"

// Components:
import { Button } from "components/elements/buttons"
import { Loader } from "components/elements/misc"

// Constants:
import { LOGIN_PATH } from "constants"

// Contexts:
import { AuthContext } from "contexts/auth"

export default function PrivatePage({ children, ...props }) {
    const { user, loading, error } = useContext(AuthContext)

    const router = useRouter()

    return (
        <div {...props}>
            {user && !loading && !error ? (
                <div>{children}</div>
            ) : loading ? (
                <div>
                    <Loader />{" "}
                </div>
            ) : (
                <div className="py-40 px-4 text-stone-600">
                    <div className="flex flex-col items-center space-y-4">
                        <h3>Please login to access this page.</h3>
                        <div></div>
                        <div className="w-min">
                            <Button
                                primary
                                onClick={(e) => router.push(LOGIN_PATH)}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
