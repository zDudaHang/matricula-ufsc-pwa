package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import lombok.Getter;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Embeddable
@Getter
public class TurmaHorariosPrimaryKey implements Serializable {

	private static final long serialVersionUID = -6677952938315394840L;

	@ManyToOne
	@MapsId
	@JsonIgnore
	private Turma turma;

	@ManyToOne
	@MapsId
	private DiaSemana diaSemana;

	@ManyToOne
	@MapsId
	private Horario horario;

	@Column
	private String sala;
}
