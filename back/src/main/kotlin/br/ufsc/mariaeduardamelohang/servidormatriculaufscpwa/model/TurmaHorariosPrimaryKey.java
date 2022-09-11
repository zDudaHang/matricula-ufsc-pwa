package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

@Embeddable
public class TurmaHorariosPrimaryKey implements Serializable {

	private static final long serialVersionUID = -6677952938315394840L;

	@ManyToOne
	@MapsId
	Turma turma;

	@ManyToOne
	@MapsId
	DiaSemana diaSemana;

	@ManyToOne
	@MapsId
	Horario horario;

	@Column
	String sala;

	public Turma getTurma() {
		return turma;
	}

	public DiaSemana getDiaSemana() {
		return diaSemana;
	}

	public Horario getHorario() {
		return horario;
	}

	public String getSala() {
		return sala;
	}
}
