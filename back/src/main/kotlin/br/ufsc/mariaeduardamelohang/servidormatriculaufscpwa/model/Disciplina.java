package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TB_DISCIPLINA")
public class Disciplina implements Serializable {

	private static final long serialVersionUID = 7229281137744422191L;

	@Id
	String codigo;

	@Column(nullable = false)
	String nome;

	@Column(nullable = false)
	int cargaHoraria;
}
