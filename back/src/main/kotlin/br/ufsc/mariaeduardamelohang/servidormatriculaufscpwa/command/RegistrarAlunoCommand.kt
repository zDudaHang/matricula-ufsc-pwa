package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.input.RegistrarAlunoInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Aluno
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.transaction.Transactional

@Repository
class RegistrarAlunoCommand(
    private val em: EntityManager,
) {
    @Transactional
    fun execute(input: RegistrarAlunoInput): Aluno? {
        val aluno = Aluno()
        aluno.nome = input.nome
        aluno.nomeUsuario = input.nomeUsuario
        aluno.senha = input.senha
        aluno.iaa = input.iaa

        em.persist(aluno)

        return aluno
    }
}