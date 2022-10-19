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
@Table(name = "TB_DIA_SEMANA")
@Getter
public class DiaSemana implements Serializable {

	private static final long serialVersionUID = -3453802262703116799L;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nome;
}
