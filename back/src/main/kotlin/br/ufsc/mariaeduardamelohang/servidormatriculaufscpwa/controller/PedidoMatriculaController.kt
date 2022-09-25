package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.controller

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.input.PedidoMatriculaInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class PedidoMatriculaController(
    private val alunoService: AlunoService
) {

    @GetMapping("/pedidoMatricula")
    fun pedidoMatricula() : List<Turma> {
        return alunoService.buscarPedidoMatricula()
    }

    @PostMapping("/registrarPedidoMatricula", consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun registrarPedidoMatricula(@RequestBody codigosTurmas: List<String>) : List<Turma> {
        return alunoService.registrarPedidoMatricula(codigosTurmas)
    }
}