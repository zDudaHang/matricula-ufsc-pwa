package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_PROFESSOR")
@Getter
public class Professor implements Serializable {

	private static final long serialVersionUID = -6877911942122147403L;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;

	@Column(nullable = false)
	@Setter
	private String nome;
}
