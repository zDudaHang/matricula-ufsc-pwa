package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType.IDENTITY
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.Table

@Entity
@Table(name = "TB_DISCIPLINA")
data class Disciplina(
    @Id @GeneratedValue(strategy = IDENTITY)
    var id: Long? = null,

    @Column(nullable = false)
    val nome: String,

    @Column(nullable = false)
    var cargaHoraria: Int
)