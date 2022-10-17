package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarDiasSemanaQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarHorariosQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarPedidoMatriculaByMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarTurmasQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.RegistrarPedidoMatriculaCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.notificacoes.BuscarAlunoPerderamVagaQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.DiaSemana
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Horario
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.dto.PedidoMatriculaDTO
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.util.AuthUtils
import org.springframework.stereotype.Service
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

    @Transactional
    fun registrarPedidoMatricula(codigosTurmas: List<String>): List<Turma> {
        val aluno = AuthUtils.getAlunoAutenticado()
        return if (aluno != null) {
            val codigosTurmasJahMatriculadas = buscarPedidoMatriculaByMatriculaCommand.execute(aluno.matricula).map { it.turma.codigo }
            val result = registrarPedidoMatriculaCommand.execute(codigosTurmas, aluno, codigosTurmasJahMatriculadas.toSet())
            val alunosPrecisamSerNotificados = buscarAlunoPerderamVagaQuery.execute(result.turmasNovas)
            // TODO: Ver uma forma melhor de verificar quais alunos devem ser notificados -> Tá notificando o próprio aluno (?)
            alunosPrecisamSerNotificados.forEach {
                pushNotificationService.sendNotification("Vaga perdida na turma ${it.turma.codigo}", "Edite o seu pedido de matrícula caso queira trocar de turma.", it.aluno.token)
            }
            return result.getTurmasMatriculadas()
        } else listOf()
    }

    fun buscarHorarios(): List<Horario> {
        return buscarHorariosQuery.execute()
    }

    fun buscarDiasSemana(): List<DiaSemana> {
        return buscarDiasSemanaQuery.execute()
    }
}