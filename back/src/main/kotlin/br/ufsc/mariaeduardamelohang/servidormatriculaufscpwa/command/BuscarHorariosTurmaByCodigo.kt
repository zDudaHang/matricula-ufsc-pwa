package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QTurmaHorarios.turmaHorarios
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.TurmaHorarios
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class BuscarHorariosTurmaByCodigo(
    private val em: EntityManager
) {
    @Transactional
    fun execute(codigo: String) : List<TurmaHorarios> {
        return JPAQueryFactory(em)
            .selectFrom(turmaHorarios)
            .where(turmaHorarios.id.turma.codigo.eq(codigo))
            .fetch()
    }
}