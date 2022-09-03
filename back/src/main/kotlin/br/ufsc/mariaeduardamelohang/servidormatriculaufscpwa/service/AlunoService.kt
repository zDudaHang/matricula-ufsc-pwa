package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarAlunoByMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarAlunoByUsernameCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.RegistrarAlunoCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.RegistrarAlunoInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Aluno
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class AlunoService(
    private val registrarAlunoCommand: RegistrarAlunoCommand,
    private val buscarAlunoByUsernameCommand: BuscarAlunoByUsernameCommand,
    private val buscarAlunoByMatriculaCommand: BuscarAlunoByMatriculaCommand,
    private val passwordEncoder: BCryptPasswordEncoder
) : UserDetailsService {
    /**
     * TODO:
     * - Tratar o cenário de ter um aluno com o mesmo username
     */
    fun registrarAluno(input: RegistrarAlunoInput): Aluno? {
        val inputWithEncodedPassword = RegistrarAlunoInput(
            input.nome,
            input.nomeUsuario,
            passwordEncoder.encode(input.senha),
            input.iaa
        )
        return registrarAlunoCommand.execute(inputWithEncodedPassword)
    }

    fun buscarAlunoPelaMatricula(matricula: UUID): Aluno? {
        return buscarAlunoByMatriculaCommand.execute(matricula)
    }

    override fun loadUserByUsername(username: String): UserDetails? {
        return buscarAlunoByUsernameCommand.execute(username)
    }
}