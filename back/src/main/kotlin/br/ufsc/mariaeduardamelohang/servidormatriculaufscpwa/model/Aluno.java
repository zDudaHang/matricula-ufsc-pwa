package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import static javax.persistence.GenerationType.AUTO;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "TB_ALUNO")
public class Aluno implements Serializable, UserDetails {

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

	public UUID getMatricula() {
		return matricula;
	}

	@Override public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList();
	}

	@Override public String getPassword() {
		return this.senha;
	}

	@Override public String getUsername() {
		return this.nomeUsuario;
	}

	@Override public boolean isAccountNonExpired() {
		return true;
	}

	@Override public boolean isAccountNonLocked() {
		return true;
	}

	@Override public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override public boolean isEnabled() {
		return true;
	}
}
