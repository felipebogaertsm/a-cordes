// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useContext } from "react"
import Link from "next/link"

// Components:
import { NavbarItem, NavbarUserDropdown } from ".."

// Contexts:
import { AuthContext } from "../../../contexts/auth"

export default function Navbar() {
    const { user } = useContext(AuthContext)

    return (
        <div className="w-full">
            <div
                className="
                    bg-dark text-light md:py-0 whitespace-nowrap
                    px-2 md:px-4 border-b-2 border-light select-none
                    no-scrollbar w-full
                "
            >
                <div className="h-full grid grid-cols-8 md:grid-flow-col grid-flow-row py-2">
                    <div className="my-auto">
                        <Link href="/">
                            <h3
                                className="
                                    lowercase text-primary cursor-pointer brightness-150
                                    w-min transition-all duration-200 hue-rotate-180 invert
                                "
                            >
                                à cordes
                            </h3>
                        </Link>
                    </div>

                    <div className="flex md:flex-row flex-col mx-auto col-span-6 gap-2">
                        <NavbarItem to="/">Home</NavbarItem>

                        <NavbarItem to="/makers">Makers</NavbarItem>

                        <NavbarItem to="/makers">Bows</NavbarItem>

                        <NavbarItem to="/makers">Instruments</NavbarItem>

                        <NavbarItem to="/makers">Accessories</NavbarItem>
                    </div>

                    <div className="flex md:flex-row flex-col ml-auto gap-2">
                        {user && user !== {} && (
                            <>
                                <NavbarItem to="/cart">Cart</NavbarItem>
                                <NavbarUserDropdown />
                            </>
                        )}

                        {!user && (
                            <NavbarItem to="/auth/login">Login</NavbarItem>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
