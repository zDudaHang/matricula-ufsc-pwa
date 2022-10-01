package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.PedidoMatricula
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.PedidoMatriculaPrimaryKey
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class RegistrarPedidoMatriculaCommand(
    private val em: EntityManager,
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
            }
        }

        codigoTurmasRemovidas.forEach {
            val turma = em.getReference(Turma::class.java, it)
            val pedidoVaiSerRemovido = em.find(
                PedidoMatricula::class.java,
                PedidoMatriculaPrimaryKey(turma, aluno)
            )
            em.remove(pedidoVaiSerRemovido)
        }

        codigoTurmasMantidas.forEach {
            val turma = em.getReference(Turma::class.java, it)
            turmasMartriculadas.add(turma)
        }

        return turmasMartriculadas
    }
}