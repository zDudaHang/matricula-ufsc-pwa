package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToMany
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.Table

@Entity
@Table(name = "TB_TURMA")
data class Turma(
    @Id
    val codigo: String,

    @Column(nullable = false)
    val sala: String,

    @Column(nullable = false)
    val vagasOfertadas: Int,

    @Column(nullable = false)
    var vagasOcupadas: Int = 0,

    @ManyToOne
    @JoinColumn(name="matricula_professor", nullable=false, referencedColumnName = "matricula")
    var professor: Professor,

    @ManyToOne
    @JoinColumn(name="id_disciplina", nullable=false, referencedColumnName = "id")
    var disciplina: Disciplina,

    @ManyToMany(mappedBy = "pedidosMatricula")
    var alunosMatriculados: List<Aluno> = emptyList()

) : Serializable