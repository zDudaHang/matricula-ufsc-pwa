package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.security

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.FORBIDDEN)
class HttpForbiddenException(override val message: String?) : RuntimeException(message)