// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

export function getDetailFromResponseError(err) {
    if (err.response) {
        if (err.response.data) {
            if (err.response.data.detail) {
                return err.response.data.detail
            }

            if (err.response.data.message) {
                return err.response.data.message
            }

            try {
                let errorString = ""

                for (const field in err.response.data) {
                    errorString +=
                        `${field}: ${err.response.data[field].join(" ")}` + " "
                }

                return errorString
            } catch (err) {
                // pass
            }
        }
    }

    return err.message
}
