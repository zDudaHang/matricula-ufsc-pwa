package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "TB_ALUNO")
public class Aluno implements Serializable {

	private static final long serialVersionUID = 871628892533743316L;

	@Id @GeneratedValue(strategy = IDENTITY)
	Long matricula;

	@Column(nullable = false)
	String nome;

	@Column(unique = true, nullable = false)
	String nomeUsuario;

	@Column(nullable = false)
	String senha;

	@Column(nullable = false)
	Float iaa;

	@ManyToMany
	@JoinTable(
			name = "TB_PEDIDO_MATRICULA",
			joinColumns = @JoinColumn(name = "matricula_aluno"),
			inverseJoinColumns = @JoinColumn(name = "codigo_turma")
	)
	List<Turma> pedidosMatricula;
}
