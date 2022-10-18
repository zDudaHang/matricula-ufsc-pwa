package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.notificacoes

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.QAluno.aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.QPedidoMatricula.pedidoMatricula
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.QTurma.turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.dto.PerdaVagaDto
import com.querydsl.core.types.Projections
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import java.util.UUID
import javax.persistence.EntityManager

@Repository
class BuscarAlunoPerderamVagaQuery(
    private val em: EntityManager
) {
    fun execute(codigoTurmas: List<String>, matriculaAluno: UUID): List<PerdaVagaDto> {
        return JPAQueryFactory(em)
            .select(Projections.constructor(PerdaVagaDto::class.java, aluno, turma))
            .from(pedidoMatricula)
            .innerJoin(aluno).on(pedidoMatricula.id.aluno.matricula.eq(aluno.matricula))
            .innerJoin(turma).on(turma.codigo.eq(pedidoMatricula.id.turma.codigo))
            .where(
                pedidoMatricula.posicao.gt(turma.vagasOfertadas).and(aluno.token.isNotNull)
                    .and(
                        turma.codigo.`in`(codigoTurmas)
                            .and(
                                aluno.matricula.ne(matriculaAluno)
                            )
                    )
            )
            .fetch()
    }
}