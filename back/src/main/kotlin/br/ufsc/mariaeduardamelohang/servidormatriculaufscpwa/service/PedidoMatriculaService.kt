package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarDiasSemanaQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarHorariosQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarPedidoMatriculaByMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarTurmasQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.RegistrarPedidoMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.notificacoes.BuscarAlunosPerderamVagaQuery
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
    private val buscarAlunosPerderamVagaQuery: BuscarAlunosPerderamVagaQuery,
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
            buscarPedidoMatriculaByMatriculaCommand.execute(aluno.getMatricula())
        } else {
            mutableListOf()
        }
    }

    fun registrarPedidoMatricula(codigosTurmas: List<String>): List<Turma> {
        val aluno = AuthUtils.getAlunoAutenticado()
        return if (aluno != null) {
            val result = salvarPedidoMatricula(codigosTurmas, aluno)
            notificarAlunos(result, aluno.matricula)
            return result.getTurmasMatriculadas()
        } else listOf()
    }

    @Transactional
    private fun salvarPedidoMatricula(codigosTurmas: List<String>, aluno: Aluno): RegistroPedidoMatriculaResult {
        val codigosTurmasJahMatriculadas = buscarPedidoMatriculaByMatriculaCommand.execute(aluno.matricula).map { it.turma.codigo }
        return registrarPedidoMatriculaCommand.execute(codigosTurmas, aluno, codigosTurmasJahMatriculadas.toSet())
    }

    // TODO: Melhorar a query para não notificar um aluno que já foi notificado pela perda + notificar se alguém ganhou uma vaga também !
    private fun notificarAlunos(result: RegistroPedidoMatriculaResult, matriculaDeveSerIgnorada: UUID) {
        notificarPerdaVaga(result.turmasNovas.map { it.codigo }, matriculaDeveSerIgnorada)
        notificarGanhoVaga(result.turmasRemovidas.map { it.codigo }, matriculaDeveSerIgnorada)
    }

    private fun notificarPerdaVaga(codigoTurmasNovas: List<String>, matriculaDeveSerIgnorada: UUID) {
        val alunosPerderamVaga = buscarAlunosPerderamVagaQuery.execute(codigoTurmasNovas, matriculaDeveSerIgnorada)
        alunosPerderamVaga.forEach {
            logger.debug("Notificando o aluno ${it.alunoNomeUsuario} porque perdeu a vaga na turma ${it.codigoTurma}")
            pushNotificationService.notifyPerdaVaga(it.alunoSubscriptionToken, it.codigoTurma)
        }
    }

    private fun notificarGanhoVaga(codigoTurmasRemovidas: List<String>, matriculaDeveSerIgnorada: UUID) {
        val alunosGanharamVaga = buscarAlunosPerderamVagaQuery.execute(codigoTurmasRemovidas, matriculaDeveSerIgnorada)
        alunosGanharamVaga.forEach {
            logger.debug("Notificando o aluno ${it.alunoNomeUsuario} porque saiu da fila de espera da turma ${it.codigoTurma}")
            pushNotificationService.notifyGanhoVaga(it.alunoSubscriptionToken, it.codigoTurma)
        }
    }

    fun buscarHorarios(): List<Horario> {
        return buscarHorariosQuery.execute()
    }

    fun buscarDiasSemana(): List<DiaSemana> {
        return buscarDiasSemanaQuery.execute()
    }
}