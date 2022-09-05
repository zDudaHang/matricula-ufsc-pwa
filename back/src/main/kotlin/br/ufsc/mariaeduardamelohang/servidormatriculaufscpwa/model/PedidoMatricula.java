package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

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
	private Float iaaAluno;

	@Column
	private int posicao;

	public PedidoMatricula(PedidoMatriculaPrimaryKey id) {
		this.id = id;
		this.iaaAluno = id.aluno.getIaa();
	}

	public int getPosicao() {
		return posicao;
	}

}
