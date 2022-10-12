package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.validator

import br.ufsc.bridge.platform.validation.form.errors.FormError
import br.ufsc.bridge.platform.validation.form.errors.FormErrorImpl
import br.ufsc.bridge.platform.validation.rules.Rules.required
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.PedidoMatriculaInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database.Turma
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import javax.persistence.EntityManager

@Component
class RegistroPedidoMatriculaInputValidator(
    private val em: EntityManager
) {

    @Transactional
    fun validate(input: PedidoMatriculaInput) : FormError<PedidoMatriculaInput> {
        val error = FormErrorImpl(input)

        error.check(PedidoMatriculaInput::turmas, required)

        if (error.isValid) {
            val turmas: MutableList<Turma> = mutableListOf()
            input.turmas.forEach {
                turmas.add(em.find(Turma::class.java, it))
            }

            val horariosComConflito = turmas
                .map { it.horarios }
                .flatten()
                .groupBy { ConflitoKey(it.id.diaSemana.id, it.id.horario.id) }
                .filter { it.value.size > 1 }

            if (horariosComConflito.isNotEmpty()) {
                error.fieldError(PedidoMatriculaInput::horarios, "Conflito encontrado")
            }
        }

        return error
    }
}