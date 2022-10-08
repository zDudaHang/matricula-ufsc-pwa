package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.PerdaVagaDto
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.QAluno.aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.QPedidoMatricula.pedidoMatricula
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.QTurma.turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma
import com.querydsl.core.types.Projections
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager

@Repository
class BuscarAlunoPerderamVaga(
    private val em: EntityManager
) {
    fun execute(turmasComAlunosNovos: List<Turma>): List<PerdaVagaDto> {
        return JPAQueryFactory(em)
            .select(Projections.constructor(PerdaVagaDto::class.java, aluno, turma))
            .from(pedidoMatricula)
            .innerJoin(aluno).on(pedidoMatricula.id.aluno.matricula.eq(aluno.matricula))
            .innerJoin(turma).on(turma.codigo.eq(pedidoMatricula.id.turma.codigo))
            .where(
                pedidoMatricula.posicao.gt(turma.vagasOfertadas).and(aluno.token.isNotNull)
            )
            .fetch()
    }
}