package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TB_HORARIO")
public class Horario implements Serializable {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	Long id;

	@Column(nullable = false)
	LocalTime horario;

	public Long getId() {
		return id;
	}

	public LocalTime getHorario() {
		return horario;
	}
}
