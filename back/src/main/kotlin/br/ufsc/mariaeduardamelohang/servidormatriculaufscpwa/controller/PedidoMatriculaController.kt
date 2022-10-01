package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.controller

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class PedidoMatriculaController(
    private val alunoService: AlunoService
) {

    @GetMapping("/pedidoMatricula")
    fun pedidoMatricula(): List<Turma> {
        return alunoService.buscarPedidoMatricula()
    }
}