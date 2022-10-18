package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TB_HORARIO")
public class Horario implements Serializable {

	private static final long serialVersionUID = 5040258127046402484L;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	Long id;

	@Column(nullable = false)
	String horario;

	@Column(nullable = false)
	boolean isUltimoHorarioPeriodo = false;

	public Long getId() {
		return id;
	}

	public String getHorario() {
		return horario;
	}

	public boolean isUltimoHorarioPeriodo() {
		return isUltimoHorarioPeriodo;
	}
}
