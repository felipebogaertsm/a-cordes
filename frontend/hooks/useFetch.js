// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useState } from "react"

// Utils:
import { getDetailFromResponseError } from "../utils/errors"

export default function useFetch({ client, method, url, payload }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const doFetch = async () => {
        setLoading(true)
        setData(null)
        setError(null)

        try {
            const { data } = await client[method](url, payload)
            setData(data)
        } catch (err) {
            setError(getDetailFromResponseError(err))
        }

        setLoading(false)
    }

    return [{ data, loading, error }, doFetch]
}
