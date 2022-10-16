package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.controller

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.config.LOGIN_ENDPOINT
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.config.REGISTRAR_ALUNO_ENDPOINT
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.dto.LoginDTO
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.input.LoginInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.input.RegistrarAlunoInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AlunoService
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.AuthenticationService
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service.JWTService
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.validator.RegistrarAlunoInputValidator
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.validator.throwIfInvalid
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class AlunoController(
    private val alunoService: AlunoService,
    private val jwtService: JWTService,
    private val authenticationService: AuthenticationService,
    private val registrarAlunoInputValidator: RegistrarAlunoInputValidator
) {
    @PostMapping(REGISTRAR_ALUNO_ENDPOINT, consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun registrarAluno(@RequestBody input: RegistrarAlunoInput): Aluno? {
        registrarAlunoInputValidator.validate(input).throwIfInvalid()
        return alunoService.registrarAluno(input)
    }

    @PostMapping(LOGIN_ENDPOINT, consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun login(@RequestBody input: LoginInput): LoginDTO? {
        val authentication = authenticationService.authenticate(input)
        val aluno: Aluno = authentication.principal as Aluno
        return LoginDTO(
            aluno.token,
            jwtService.generateToken(aluno.matricula)
        )
    }
}