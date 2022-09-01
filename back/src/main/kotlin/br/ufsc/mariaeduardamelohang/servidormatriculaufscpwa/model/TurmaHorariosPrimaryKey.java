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
	Horario horarioInicio;

	@ManyToOne
	@MapsId
	Horario horarioFinal;

	@Column
	String sala;
}
