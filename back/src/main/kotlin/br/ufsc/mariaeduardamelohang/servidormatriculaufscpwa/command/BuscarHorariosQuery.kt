package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Horario
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QHorario.horario1
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class BuscarHorariosQuery(
    private val em: EntityManager
) {

    @Transactional
    fun execute(): List<Horario> {
        return JPAQueryFactory(em)
            .selectFrom(horario1)
            .fetch()
    }
}