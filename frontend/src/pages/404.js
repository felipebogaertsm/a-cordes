// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        router.push("/")
    }, [])

    return <div>404 - Page not found</div>
}
