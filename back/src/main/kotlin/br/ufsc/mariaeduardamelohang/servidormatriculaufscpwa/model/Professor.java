package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TB_PROFESSOR")
public class Professor implements Serializable {

	private static final long serialVersionUID = -6877911942122147403L;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	Long matricula;

	@Column(nullable = false)
	String nome;
}
