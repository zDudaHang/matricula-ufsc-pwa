package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarAlunoByMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarAlunoByUsernameCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarPedidoMatriculaByMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.RegistrarAlunoCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.RegistrarPedidoMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.input.PedidoMatriculaInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.input.RegistrarAlunoInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.util.AuthUtils
import com.querydsl.core.Tuple
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

    fun buscarPedidoMatricula(): List<Turma>{
        val aluno = AuthUtils.getAlunoAutenticado()
        return if (aluno != null)
            buscarPedidoMatriculaByMatriculaCommand.execute(aluno.matricula)
        else mutableListOf()
    }

    fun buscarAlunoPelaMatricula(matricula: UUID): Aluno? {
        return buscarAlunoByMatriculaCommand.execute(matricula)
    }

    fun registrarPedidoMatricula(input: PedidoMatriculaInput): MutableList<Turma> {
        val aluno = AuthUtils.getAlunoAutenticado()
        return if (aluno != null) {
            // val codigosTurmasJahMatriculadas = buscarPedidoMatriculaByMatriculaCommand.execute(aluno.matricula).map { it.codigo }
            val codigosTurmasJahMatriculadas = emptySet<String>()
            registrarPedidoMatriculaCommand.execute(input, aluno, codigosTurmasJahMatriculadas.toSet())
        } else mutableListOf()
    }

    override fun loadUserByUsername(username: String): UserDetails? {
        return buscarAlunoByUsernameCommand.execute(username)
    }
}