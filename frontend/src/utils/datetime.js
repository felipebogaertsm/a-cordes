// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

export function stringToDate(string) {
    const date = new Date(string)
    return `${getMonthFromInt(date.getMonth() + 1)} ${date.getDate()}, \
            ${date.getFullYear()} at \
            ${date.getHours()}:${date.getMinutes()}`
}

export function getMonthFromInt(integer) {
    integer = Number(integer)

    switch (integer) {
        case 1:
            return "January"
        case 2:
            return "February"
        case 3:
            return "March"
        case 4:
            return "April"
        case 5:
            return "May"
        case 6:
            return "June"
        case 7:
            return "July"
        case 8:
            return "August"
        case 9:
            return "September"
        case 10:
            return "October"
        case 11:
            return "November"
        case 12:
            return "December"
        default:
            return "January"
    }
}
