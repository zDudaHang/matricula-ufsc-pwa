package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import static javax.persistence.GenerationType.AUTO;

import java.io.Serializable;
import java.util.UUID;

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
	@GeneratedValue(strategy = AUTO)
	UUID matricula;

	@Column(nullable = false)
	String nome;
}
