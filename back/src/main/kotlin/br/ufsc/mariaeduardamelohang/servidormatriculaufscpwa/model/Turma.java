package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TB_TURMA")
public class Turma implements Serializable {

	private static final long serialVersionUID = 1848354516429296191L;

	@Id
	String codigo;

	@Column(nullable = false)
	String sala;

	@Column(nullable = false)
	int vagasOfertadas;

	@Column(nullable = false)
	int vagasOcupadas = 0;

	@ManyToOne
	@JoinColumn(name = "matricula_professor", nullable = false, referencedColumnName = "matricula")
	Professor professor;

	@ManyToOne
	@JoinColumn(name = "id_disciplina", nullable = false, referencedColumnName = "id")
	Disciplina disciplina;

	@ManyToMany(mappedBy = "pedidosMatricula")
	List<Aluno> alunosMatriculados;
}