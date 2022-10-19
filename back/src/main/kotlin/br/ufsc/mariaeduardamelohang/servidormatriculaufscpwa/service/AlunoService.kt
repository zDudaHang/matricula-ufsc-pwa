package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarAlunoByMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarUserDetailsByAlunoUsernameQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.RegistrarAlunoCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.input.RegistrarAlunoInput
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class AlunoService(
    private val buscarUserDetailsByAlunoUsernameQuery: BuscarUserDetailsByAlunoUsernameQuery,
    private val buscarAlunoByMatriculaCommand: BuscarAlunoByMatriculaCommand,
    private val registrarAlunoCommand: RegistrarAlunoCommand,
    private val passwordEncoder: BCryptPasswordEncoder,
) : UserDetailsService {

    fun registrarAluno(input: RegistrarAlunoInput): String {
        val inputWithEncodedPassword = RegistrarAlunoInput(
            input.nomeUsuario,
            passwordEncoder.encode(input.senha)
        )
        return registrarAlunoCommand.execute(inputWithEncodedPassword)
    }

    fun buscarAlunoPelaMatricula(matricula: UUID): Aluno? {
        return buscarAlunoByMatriculaCommand.execute(matricula)
    }

    override fun loadUserByUsername(username: String): UserDetails? {
        return buscarUserDetailsByAlunoUsernameQuery.execute(username)
    }
}