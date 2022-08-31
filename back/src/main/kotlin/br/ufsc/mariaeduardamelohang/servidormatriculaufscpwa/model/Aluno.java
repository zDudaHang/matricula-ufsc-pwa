package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import static javax.persistence.GenerationType.AUTO;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

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

	@Id @GeneratedValue(strategy = AUTO)
	private UUID matricula;

	@Column(nullable = false)
	private String nome;

	@Column(unique = true, nullable = false)
	private String nomeUsuario;

	@Column(nullable = false)
	private String senha;

	@Column(nullable = false)
	private Float iaa;

	@ManyToMany
	@JoinTable(
			name = "TB_PEDIDO_MATRICULA",
			joinColumns = @JoinColumn(name = "matricula_aluno"),
			inverseJoinColumns = @JoinColumn(name = "codigo_turma")
	)
	private List<Turma> pedidosMatricula;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getNomeUsuario() {
		return nomeUsuario;
	}

	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public Float getIaa() {
		return iaa;
	}

	public void setIaa(Float iaa) {
		this.iaa = iaa;
	}
}
