package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class PedidoMatriculaController {

    @GetMapping("/pedidoMatricula")
    fun pedidoMatricula() : Int {
        println("/pedidoMatricula")
        return 0
    }
}