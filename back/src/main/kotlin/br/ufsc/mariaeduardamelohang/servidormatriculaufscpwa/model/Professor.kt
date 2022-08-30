package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType.IDENTITY
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.Table

@Entity
@Table(name = "TB_PROFESSOR")
data class Professor(
    @Id
    @GeneratedValue(strategy = IDENTITY)
    var matricula: Long? = null,

    @Column(nullable = false)
    val nome: String
)