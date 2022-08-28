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
                <div className="flex md:flex-row flex-col h-full">
                    <NavbarItem to="/">
                        <div className="flex flex-row justify-end">
                            <h3 className="lowercase textlight font-semibold">
                                à
                            </h3>
                        </div>
                    </NavbarItem>

                    <div className="grow"></div>

                    <NavbarItem to="/makers">Makers</NavbarItem>

                    <NavbarItem to="/makers">Bows</NavbarItem>

                    <NavbarItem to="/makers">Instruments</NavbarItem>

                    <NavbarItem to="/makers">Accessories</NavbarItem>

                    {user && user !== {} && (
                        <>
                            <NavbarItem to="/cart">Cart</NavbarItem>

                            <NavbarUserDropdown />
                        </>
                    )}

                    <div className="grow"></div>

                    {!user && (
                        <NavbarItem to="/auth/login">
                            <div className="flex flex-row space-x-2">
                                <p className="my-auto">Login</p>
                            </div>
                        </NavbarItem>
                    )}
                </div>
            </div>
        </div>
    )
}
