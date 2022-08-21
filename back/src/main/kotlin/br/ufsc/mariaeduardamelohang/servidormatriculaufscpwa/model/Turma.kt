package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
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

    @OneToMany(mappedBy = "turma")
    var professor: Professor,

    @OneToMany(mappedBy = "turma")
    val disciplina: Disciplina

)