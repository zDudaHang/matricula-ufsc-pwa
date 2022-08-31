package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TB_DIA_SEMANA")
public class DiaSemana implements Serializable {

	private static final long serialVersionUID = -3453802262703116799L;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	Long id;

	@Column(nullable = false)
	String nome;
}
