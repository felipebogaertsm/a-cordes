// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

export function truncateString(string, maxLength) {
    if (string.length > maxLength) {
        return string.slice(0, maxLength - 3) + "..."
    }
    return string
}

export function capitalizeString(string) {
    const arr = string.split(" ")
    return arr
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" ")
}
