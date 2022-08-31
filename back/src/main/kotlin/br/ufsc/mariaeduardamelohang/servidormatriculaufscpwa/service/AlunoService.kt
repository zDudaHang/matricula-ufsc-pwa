package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.RegistrarAlunoCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.graphql.model.RegistrarAlunoInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.Aluno
import org.springframework.stereotype.Service

@Service
class AlunoService(
    private val registrarAlunoCommand: RegistrarAlunoCommand
) {
    fun registrarAluno(input: RegistrarAlunoInput): Aluno? {
        return registrarAlunoCommand.execute(input)
    }
}