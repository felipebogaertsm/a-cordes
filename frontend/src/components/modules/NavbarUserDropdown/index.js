// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import Link from "next/link"
import { useContext } from "react"

// Components:
import { NavbarItem } from "../"

// Constants:
import { USER_SETTINGS_PAGE_ROUTE } from "../../../constants/routes"

// Contexts:
import { AuthContext } from "../../../contexts/auth"

export default function NavbarUserDropdown() {
    const { logout } = useContext(AuthContext)

    return (
        <NavbarItem
            to={USER_SETTINGS_PAGE_ROUTE}
            className="group my-auto relative z-10"
        >
            <div className="flex flex-row space-x-2">
                <img
                    src="/icons/user.svg"
                    className="
                        invert h-4 my-auto
                    "
                ></img>

                <p className="my-auto">User</p>

                <div className="hidden md:group-hover:block absolute top-12 right-0 fade-in-out">
                    <div className="bg-stone-800 p-4 rounded-b-lg shadow-xl mt-4">
                        <div className="flex flex-col space-y-2 text-center">
                            <Link href={USER_SETTINGS_PAGE_ROUTE}>
                                <div className="hover:bg-stone-700 p-2 rounded-md transition-all duration-100">
                                    Settings
                                </div>
                            </Link>
                            <div
                                className="hover:bg-stone-700 p-2 rounded-md transition-all duration-100"
                                onClick={() => logout()}
                            >
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavbarItem>
    )
}
