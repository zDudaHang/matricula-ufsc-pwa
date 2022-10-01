package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Horario
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QHorario.horario1
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class BuscarHorarioById(
    private val em: EntityManager
) {

    @Transactional
    fun execute(id: Long) : Horario {
        return JPAQueryFactory(em)
            .selectFrom(horario1)
            .where(horario1.id.eq(id))
            .fetchOne()!!
    }
}