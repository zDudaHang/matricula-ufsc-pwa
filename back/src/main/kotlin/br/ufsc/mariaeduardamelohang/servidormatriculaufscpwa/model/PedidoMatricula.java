package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "TB_PEDIDO_MATRICULA")
public class PedidoMatricula implements Serializable {

	private static final long serialVersionUID = -2137506145016637392L;

	@EmbeddedId
	PedidoMatriculaPrimaryKey id;

	public PedidoMatriculaPrimaryKey getId() {
		return id;
	}

	public void setId(PedidoMatriculaPrimaryKey id) {
		this.id = id;
	}

	public PedidoMatricula(PedidoMatriculaPrimaryKey id) {
		this.id = id;
	}
}
