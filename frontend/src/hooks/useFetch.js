// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useState } from "react"

// Utils:
import { getClient } from "@/utils/axios"
import { getDetailFromResponseError } from "@/utils/errors"

export default function useFetch({
    client,
    method,
    url,
    payload: presetPayload,
}) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    if (!client) {
        client = getClient()
    }

    const doFetch = async (payload) => {
        setLoading(true)
        setData(null)
        setError(null)

        try {
            const { data } = await client[method](
                url,
                payload ? payload : presetPayload
            )
            setData(data)
        } catch (err) {
            setError(getDetailFromResponseError(err))
        }

        setLoading(false)
    }

    return [{ data, loading, error }, doFetch]
}
