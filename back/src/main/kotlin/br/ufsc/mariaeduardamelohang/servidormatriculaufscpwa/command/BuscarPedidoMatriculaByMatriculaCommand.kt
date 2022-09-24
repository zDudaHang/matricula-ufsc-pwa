package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.model.TurmaMatriculadaDTO
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QDiaSemana.diaSemana
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QHorario.horario1
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QPedidoMatricula.pedidoMatricula
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QTurma.turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QTurmaHorarios.turmaHorarios
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Turma
import com.querydsl.core.Tuple
import com.querydsl.jpa.JPAExpressions.select
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import java.util.UUID
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class BuscarPedidoMatriculaByMatriculaCommand(
    private val em: EntityManager,
) {
    @Transactional
    fun execute(matricula: UUID): List<Turma> {
        return JPAQueryFactory(em)
            .select(turma)
            .from(pedidoMatricula)
            .innerJoin(turma).on(pedidoMatricula.id.turma.codigo.eq(turma.codigo))
            .where(pedidoMatricula.id.aluno.matricula.eq(matricula))
            .fetch()
    }
}