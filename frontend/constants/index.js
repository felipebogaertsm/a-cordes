// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

// Paths:
export const BACKEND_URL = publicRuntimeConfig.BACKEND_URL
export const MEDIA_URL = publicRuntimeConfig.MEDIA_URL
export const INDEX_PATH = "/"
export const LOGIN_PATH = "/auth/login"

// Misc:
export const TOKEN_NAME = "acordes.token"
