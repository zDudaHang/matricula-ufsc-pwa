package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Aluno
import java.util.UUID


import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.QAluno.aluno
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class BuscarAlunoByMatriculaCommand(
    private val em: EntityManager,
) {
    @Transactional
    fun execute(matricula: UUID): Aluno? {
        return JPAQueryFactory(em)
            .selectFrom(aluno)
            .where(aluno.matricula.eq(matricula))
            .fetchOne()
    }
}