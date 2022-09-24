package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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

	@OneToMany(mappedBy = "id.turma")
	List<TurmaHorarios> horarios;

	public Professor getProfessor() {
		return professor;
	}

	public String getCodigo() {
		return codigo;
	}

	public int getVagasOfertadas() {
		return vagasOfertadas;
	}

	public Disciplina getDisciplina() {
		return disciplina;
	}

	public List<TurmaHorarios> getHorarios() {
		return horarios;
	}
}