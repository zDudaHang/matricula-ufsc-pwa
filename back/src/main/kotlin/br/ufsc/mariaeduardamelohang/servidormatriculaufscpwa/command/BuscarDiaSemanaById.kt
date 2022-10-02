package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.DiaSemana
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.QDiaSemana.diaSemana
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class BuscarDiaSemanaById(
    private val em: EntityManager
) {

    @Transactional
    fun execute(id: Long): DiaSemana {
        return JPAQueryFactory(em)
            .selectFrom(diaSemana)
            .where(diaSemana.id.eq(id))
            .fetchOne()!!
    }
}