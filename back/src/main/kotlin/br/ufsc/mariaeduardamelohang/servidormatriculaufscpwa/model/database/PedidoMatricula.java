package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "TB_PEDIDO_MATRICULA")
public class PedidoMatricula implements Serializable {

	private static final long serialVersionUID = -2137506145016637392L;

	@EmbeddedId
	PedidoMatriculaPrimaryKey id;

	@Column(nullable = false)
	private int iaaAluno;

	@Column
	private int posicao;

	public PedidoMatricula(PedidoMatriculaPrimaryKey id) {
		this.id = id;
		iaaAluno = id.aluno.getIaa();
	}

	public PedidoMatricula() {
	}

	public int getPosicao() {
		return posicao;
	}

	public void setPosicao(int posicao) {
		this.posicao = posicao;
	}

	public PedidoMatriculaPrimaryKey getId() {
		return id;
	}

	public int getIaaAluno() {
		return iaaAluno;
	}
}
