package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarDiasSemanaQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarHorariosQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarPedidoMatriculaByMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarTurmasQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.RegistrarPedidoMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.notificacoes.BuscarAlunoPerderamVagaQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.RegistroPedidoMatriculaResult
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.DiaSemana
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Horario
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.dto.PedidoMatriculaDTO
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.util.AuthUtils
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.UUID
import javax.transaction.Transactional

@Service
class PedidoMatriculaService(
    private val buscarPedidoMatriculaByMatriculaCommand: BuscarPedidoMatriculaByMatriculaCommand,
    private val buscarTurmasQuery: BuscarTurmasQuery,
    private val registrarPedidoMatriculaCommand: RegistrarPedidoMatriculaCommand,
    private val buscarAlunoPerderamVagaQuery: BuscarAlunoPerderamVagaQuery,
    private val buscarHorariosQuery: BuscarHorariosQuery,
    private val buscarDiasSemanaQuery: BuscarDiasSemanaQuery,
    private val pushNotificationService: PushNotificationService
) {

    private val logger: Logger = LoggerFactory.getLogger(PedidoMatriculaService::class.java)

    fun buscarTurmas(): List<Turma> {
        return buscarTurmasQuery.execute()
    }

    fun buscarPedidoMatricula(): List<PedidoMatriculaDTO> {
        val aluno = AuthUtils.getAlunoAutenticado()
        return if (aluno != null) {
            buscarPedidoMatriculaByMatriculaCommand.execute(aluno.matricula)
        } else {
            mutableListOf()
        }
    }

    fun registrarPedidoMatricula(codigosTurmas: List<String>): List<Turma> {
        val aluno = AuthUtils.getAlunoAutenticado()
        return if (aluno != null) {
            val result = salvarPedidoMatricula(codigosTurmas, aluno)
            verificarAlunosPrecisamSerNotifications(result, aluno.matricula)
            return result.getTurmasMatriculadas()
        } else listOf()
    }

    @Transactional
    private fun salvarPedidoMatricula(codigosTurmas: List<String>, aluno: Aluno): RegistroPedidoMatriculaResult {
        val codigosTurmasJahMatriculadas = buscarPedidoMatriculaByMatriculaCommand.execute(aluno.matricula).map { it.turma.codigo }
        return registrarPedidoMatriculaCommand.execute(codigosTurmas, aluno, codigosTurmasJahMatriculadas.toSet())
    }

    private fun verificarAlunosPrecisamSerNotifications(result: RegistroPedidoMatriculaResult, matricula: UUID) {
        val alunosPerderamVaga = buscarAlunoPerderamVagaQuery.execute(result.turmasNovas.map { it.codigo }, matricula)
        alunosPerderamVaga.forEach {
            logger.debug("Notificando o aluno ${it.aluno.nomeUsuario} porque perdeu a vaga na turma ${it.turma.codigo}")
            pushNotificationService.sendNotification("Vaga perdida na turma ${it.turma.codigo}", "Edite o seu pedido de matrícula caso queira trocar de turma.", it.aluno.token)
        }
    }

    fun buscarHorarios(): List<Horario> {
        return buscarHorariosQuery.execute()
    }

    fun buscarDiasSemana(): List<DiaSemana> {
        return buscarDiasSemanaQuery.execute()
    }
}