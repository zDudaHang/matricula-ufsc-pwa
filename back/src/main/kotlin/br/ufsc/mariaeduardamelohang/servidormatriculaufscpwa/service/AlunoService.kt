package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarAlunoByMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarAlunoByUsernameCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarPedidoMatriculaByMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.RegistrarAlunoCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.RegistrarPedidoMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.TurmaSolicitada
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.input.PedidoMatriculaInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.input.RegistrarAlunoInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.PedidoMatricula
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.util.AuthUtils
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class AlunoService(
    private val buscarAlunoByUsernameCommand: BuscarAlunoByUsernameCommand,
    private val buscarAlunoByMatriculaCommand: BuscarAlunoByMatriculaCommand,
    private val buscarPedidoMatriculaByMatriculaCommand: BuscarPedidoMatriculaByMatriculaCommand,
    private val registrarAlunoCommand: RegistrarAlunoCommand,
    private val registrarPedidoMatriculaCommand: RegistrarPedidoMatriculaCommand,
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

    fun buscarPedidoMatricula(): List<TurmaSolicitada> {
        val aluno = AuthUtils.getAlunoAutenticado()
        return if (aluno != null) {
            val turmas = buscarPedidoMatriculaByMatriculaCommand.execute(aluno.matricula)
            turmas.map { TurmaSolicitada(turma = it) }
        } else emptyList()
    }

    fun registrarPedidoMatricula(input: PedidoMatriculaInput): MutableList<Turma> {
        val aluno = AuthUtils.getAlunoAutenticado()
        return if (aluno != null)
            registrarPedidoMatriculaCommand.execute(input, aluno)
        else mutableListOf()
    }

    override fun loadUserByUsername(username: String): UserDetails? {
        return buscarAlunoByUsernameCommand.execute(username)
    }
}