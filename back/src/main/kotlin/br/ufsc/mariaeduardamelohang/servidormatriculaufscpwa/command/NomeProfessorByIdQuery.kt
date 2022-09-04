package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QProfessor.professor
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class NomeProfessorByIdQuery(
    private val em: EntityManager
) {
    @Transactional
    fun execute(id: Long): String {
        return JPAQueryFactory(em)
            .select(professor.nome)
            .from(professor)
            .where(professor.id.eq(id))
            .fetchOne()!!
    }
}