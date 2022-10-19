package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name = "TB_HORARIO")
@Getter
public class Horario implements Serializable {

	private static final long serialVersionUID = 5040258127046402484L;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String horario;

	@Column(nullable = false)
	private boolean isUltimoHorarioPeriodo = false;
}
