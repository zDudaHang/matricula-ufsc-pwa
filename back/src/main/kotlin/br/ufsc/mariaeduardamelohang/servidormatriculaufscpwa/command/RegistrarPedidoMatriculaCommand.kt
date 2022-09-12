package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.input.PedidoMatriculaInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Aluno
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.PedidoMatricula
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.PedidoMatriculaPrimaryKey
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Turma
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class RegistrarPedidoMatriculaCommand(
    private val em: EntityManager,
) {
    @Transactional
    fun execute(input: PedidoMatriculaInput, aluno: Aluno, codigosTurmasJahMatriculadas: Set<String>): MutableList<Turma> {
        val turmasMartriculadas = mutableListOf<Turma>()

        val turmasSolicitadas = input.codigosTurmas.toSet()
        val turmasNovas = turmasSolicitadas subtract codigosTurmasJahMatriculadas
        val turmasRemovidas = codigosTurmasJahMatriculadas subtract turmasSolicitadas

        turmasNovas.forEach {
            val turma = em.find(Turma::class.java, it)
            if (turma != null) {
                val pedidoMatricula = PedidoMatricula(PedidoMatriculaPrimaryKey(turma, aluno))
                em.persist(pedidoMatricula)
                turmasMartriculadas.add(turma)
            }
        }

        turmasRemovidas.forEach {
            val turma = em.find(Turma::class.java, it)
            val pedidoVaiSerRemovido = em.getReference(PedidoMatricula::class.java, PedidoMatriculaPrimaryKey(turma, aluno))
            em.remove(pedidoVaiSerRemovido)
        }

        return turmasMartriculadas
    }
}