package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QDisciplina.disciplina
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QProfessor.professor
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QTurma.turma
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Turma
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class BuscarTurmasQuery(
    private val em: EntityManager
) {
    @Transactional
    fun execute() : List<Turma> {
        return JPAQueryFactory(em)
            .selectFrom(turma)
            .innerJoin(disciplina).on(disciplina.codigo.eq(turma.disciplina.codigo))
            .innerJoin(professor).on(professor.id.eq(turma.professor.id))
            .fetch()
    }
}