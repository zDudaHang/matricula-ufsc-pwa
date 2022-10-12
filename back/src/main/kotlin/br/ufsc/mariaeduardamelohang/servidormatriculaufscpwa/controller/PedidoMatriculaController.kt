package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.controller

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.PedidoMatriculaInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.validator.RegistroPedidoMatriculaInputValidator
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.validator.throwIfInvalid
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class PedidoMatriculaController(
    private val alunoService: AlunoService,
    private val registroPedidoMatriculaInputValidator: RegistroPedidoMatriculaInputValidator
) {

    @GetMapping("/pedidoMatricula")
    fun pedidoMatricula(): List<Turma> {
        return alunoService.buscarPedidoMatricula()
    }

    @PostMapping("/registrarPedidoMatricula",  consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun registrarPedidoMatricula(@RequestBody input: PedidoMatriculaInput): MutableList<Turma> {
        registroPedidoMatriculaInputValidator.validate(input).throwIfInvalid()
        return alunoService.registrarPedidoMatricula(input.turmas)
    }
}