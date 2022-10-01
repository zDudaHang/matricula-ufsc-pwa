package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database;

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
	Long id;

	@Column(nullable = false)
	String nome;

	public Long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
}
