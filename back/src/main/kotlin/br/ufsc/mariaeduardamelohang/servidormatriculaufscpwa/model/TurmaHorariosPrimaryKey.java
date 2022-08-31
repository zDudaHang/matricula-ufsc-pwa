package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

@Embeddable
public class TurmaHorariosPrimaryKey implements Serializable {

	private static final long serialVersionUID = -6677952938315394840L;

	@OneToOne
	@MapsId
	Turma turma;

	@OneToOne
	@MapsId
	DiaSemana diaSemana;

	@OneToOne
	@MapsId
	Horario horarioInicio;

	@OneToOne
	@MapsId
	Horario horarioFinal;
}
