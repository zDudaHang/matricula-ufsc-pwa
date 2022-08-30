package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType.IDENTITY
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "TB_ALUNO")
data class Aluno(
    @Id @GeneratedValue(strategy = IDENTITY)
    var matricula: Long? = null,

    @Column(nullable = false)
    val nome: String,

    @Column(unique = true, nullable = false)
    val nomeUsuario: String,

    @Column(nullable = false)
    val senha: String,

    @Column(nullable = false)
    val iaa: Float
) : Serializable