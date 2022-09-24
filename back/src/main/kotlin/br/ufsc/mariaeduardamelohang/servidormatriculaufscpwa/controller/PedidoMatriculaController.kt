package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.controller

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import com.querydsl.core.Tuple
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class PedidoMatriculaController(
    private val alunoService: AlunoService
) {

    @GetMapping("/pedidoMatricula")
    fun pedidoMatricula() : List<Turma> {
        val turmas = alunoService.buscarPedidoMatricula()
        return turmas
    }
}