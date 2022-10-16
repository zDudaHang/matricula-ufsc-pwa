package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.validator

import br.ufsc.bridge.platform.validation.form.errors.FormError
import br.ufsc.bridge.platform.validation.form.errors.FormErrorImpl
import br.ufsc.bridge.platform.validation.rules.Rules.range
import br.ufsc.bridge.platform.validation.rules.Rules.required
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.BuscarAlunoByUsernameQuery
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.input.RegistrarAlunoInput
import org.springframework.stereotype.Component

@Component
class RegistrarAlunoInputValidator(
    private val buscarAlunoByUsernameQuery: BuscarAlunoByUsernameQuery
) {
    fun validate(input: RegistrarAlunoInput): FormError<RegistrarAlunoInput> {
        val error = FormErrorImpl(input)

        error.check(RegistrarAlunoInput::nome, required)
        error.check(RegistrarAlunoInput::nomeUsuario, required)
        error.check(RegistrarAlunoInput::iaa, required)
        error.check(RegistrarAlunoInput::iaa, range(0, 10))
        error.check(RegistrarAlunoInput::senha, required)

        if (error.isValid && input.nomeUsuario != null) {
            val aluno = buscarAlunoByUsernameQuery.execute(input.nomeUsuario)
            if (aluno != null) {
                error.fieldError(
                    RegistrarAlunoInput::nomeUsuario,
                    "Nome de usuário já existente"
                )
            }
        }

        return error
    }
}