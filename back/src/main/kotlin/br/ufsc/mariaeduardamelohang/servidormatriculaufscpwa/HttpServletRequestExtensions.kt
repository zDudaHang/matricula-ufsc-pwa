package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa

import javax.servlet.http.HttpServletRequest

fun HttpServletRequest.getAuthorizationHeader() : String? {
    return this.getHeader("Authorization")
}