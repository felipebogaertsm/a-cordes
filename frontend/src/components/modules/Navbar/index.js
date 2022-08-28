// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useContext } from "react"

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
                <div className="h-full grid grid-cols-8 md:grid-flow-col grid-flow-row">
                    {/* <div className="flex md:flex-row flex-col h-full"> */}
                    <div>
                        <NavbarItem to="/">
                            <div className="flex flex-row justify-end">
                                <h3 className="lowercase textlight font-semibold">
                                    à
                                </h3>
                            </div>
                        </NavbarItem>
                    </div>

                    <div className="flex md:flex-row flex-col mx-auto col-span-6 gap-1">
                        <NavbarItem to="/makers">Makers</NavbarItem>

                        <NavbarItem to="/makers">Bows</NavbarItem>

                        <NavbarItem to="/makers">Instruments</NavbarItem>

                        <NavbarItem to="/makers">Accessories</NavbarItem>
                    </div>

                    <div className="flex md:flex-row flex-col ml-auto">
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
