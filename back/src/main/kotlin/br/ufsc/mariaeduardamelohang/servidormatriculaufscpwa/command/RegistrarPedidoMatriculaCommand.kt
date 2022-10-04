package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.PedidoMatricula
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.PedidoMatriculaPrimaryKey
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.QPedidoMatricula.pedidoMatricula
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma
import com.querydsl.jpa.impl.JPAQueryFactory
import com.querydsl.sql.SQLExpressions.rowNumber
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class RegistrarPedidoMatriculaCommand(
    private val em: EntityManager,
    private val logger: Logger = LoggerFactory.getLogger(RegistrarPedidoMatriculaCommand::class.java),
) {
    @Transactional(Transactional.TxType.SUPPORTS)
    fun execute(codigosTurmas: List<String>, aluno: Aluno, codigosTurmasJahMatriculadas: Set<String>): MutableList<Turma> {
        val turmasMartriculadas = mutableListOf<Turma>()

        val codigoTurmasSolicitadas = codigosTurmas.toSet()
        val codigoTurmasNovas = codigoTurmasSolicitadas subtract codigosTurmasJahMatriculadas
        val codigoTurmasRemovidas = codigosTurmasJahMatriculadas subtract codigoTurmasSolicitadas
        val codigoTurmasMantidas = codigoTurmasSolicitadas intersect codigosTurmasJahMatriculadas

        codigoTurmasNovas.forEach {
            val turma = em.find(Turma::class.java, it)
            if (turma != null) {
                val pedidoMatricula =
                    PedidoMatricula(PedidoMatriculaPrimaryKey(turma, aluno))
                em.persist(pedidoMatricula)
                turmasMartriculadas.add(turma)
                atualizarRanking(turma)
            }
        }

        codigoTurmasRemovidas.forEach {
            val turma = em.getReference(Turma::class.java, it)
            val pedidoVaiSerRemovido = em.find(
                PedidoMatricula::class.java,
                PedidoMatriculaPrimaryKey(turma, aluno)
            )
            em.remove(pedidoVaiSerRemovido)
            decrementarRanking(turma)
        }

        codigoTurmasMantidas.forEach {
            val turma = em.getReference(Turma::class.java, it)
            turmasMartriculadas.add(turma)
        }

        return turmasMartriculadas
    }
    
    private fun atualizarRanking(turma: Turma) {
        val posicao = rowNumber().over().orderBy(pedidoMatricula.iaaAluno.desc())
        val subQueryPosicao = JPAQueryFactory(em)
            .select(pedidoMatricula, posicao)
            .from(pedidoMatricula)
            .where(pedidoMatricula.id.turma.codigo.eq(turma.codigo))
            .fetch()

        subQueryPosicao.forEach {
            val pedidoMatricula = it.get(pedidoMatricula)
            val posicaoNova = it.get(posicao)
            if (pedidoMatricula != null && posicaoNova != null) {
                pedidoMatricula.posicao = posicaoNova.toInt()
                em.persist(pedidoMatricula)
            }
        }
    }

    private fun decrementarRanking(turma: Turma) {
        val pedidosMatricula = JPAQueryFactory(em)
            .selectFrom(pedidoMatricula)
            .where(pedidoMatricula.id.turma.codigo.eq(turma.codigo))
            .fetch()

        pedidosMatricula.forEach {
            logger.info("Decrementando a posição do pedido de matrícula ${it.id}")
            it.posicao = it.posicao - 1
            em.persist(it)
        }
    }
}