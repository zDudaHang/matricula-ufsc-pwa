package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.DiaSemana
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QDiaSemana.diaSemana
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class BuscarDiasSemanaQuery(
    private val em: EntityManager
) {
    @Transactional
    fun execute(): List<DiaSemana> {
        return JPAQueryFactory(em)
            .selectFrom(diaSemana)
            .fetch()
    }
}