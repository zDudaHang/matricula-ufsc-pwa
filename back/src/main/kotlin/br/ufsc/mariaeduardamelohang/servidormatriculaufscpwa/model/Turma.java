package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TB_TURMA")
public class Turma implements Serializable {

	private static final long serialVersionUID = 1848354516429296191L;

	@Id
	String codigo;

	@Column(nullable = false)
	int vagasOfertadas;

	@ManyToOne
	@JoinColumn(name = "id_professor", nullable = false, referencedColumnName = "id")
	Professor professor;

	@ManyToOne
	@JoinColumn(name = "codigo_disciplina", nullable = false, referencedColumnName = "codigo")
	Disciplina disciplina;

	public Professor getProfessor() {
		return professor;
	}

	public String getCodigo() {
		return codigo;
	}
}