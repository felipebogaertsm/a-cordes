// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useContext } from "react"

// Components:
import { NavbarItem } from "../"

// Contexts:
import { AuthContext } from "../../contexts/auth"

export default function NavbarUserDropdown() {
    const { logout } = useContext(AuthContext)

    return (
        <NavbarItem to="/" className="group my-auto relative">
            <div className="flex flex-row space-x-2">
                <img
                    src="/icons/user.svg"
                    className="
                        invert h-4 my-auto
                    "
                ></img>

                <p className="my-auto">User</p>

                <div className="hidden md:group-hover:block absolute top-10 right-0 fade-in-out">
                    <div className="bg-stone-800 p-4 rounded-b-lg shadow-xl mt-2">
                        <div className="flex flex-col space-y-2 text-center">
                            <div className="hover:bg-stone-700 p-2 rounded-lg transition-all duration-100">
                                Settings
                            </div>
                            <div
                                className="hover:bg-stone-700 p-2 rounded-lg transition-all duration-100"
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
