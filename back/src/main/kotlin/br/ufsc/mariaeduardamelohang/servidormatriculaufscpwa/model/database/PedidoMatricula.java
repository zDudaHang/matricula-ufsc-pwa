package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TB_PEDIDO_MATRICULA")
@Getter
@Setter
@NoArgsConstructor
public class PedidoMatricula implements Serializable {

	private static final long serialVersionUID = -2137506145016637392L;

	@EmbeddedId
	private PedidoMatriculaPrimaryKey id;

	@Column(nullable = false)
	private int iaaAluno;

	@Column(nullable = false)
	private int vagasOfertadas = 0;

	@Column
	private int posicao;

	@Column(nullable = false)
	private boolean deveNotificarAlunoGanhouVaga = false;

	@Column(nullable = false)
	private boolean deveNotificarAlunoPerdeuVaga = false;

	public PedidoMatricula(PedidoMatriculaPrimaryKey id) {
		this.id = id;
		iaaAluno = id.getAluno().getIaa();
		vagasOfertadas = id.getTurma().getVagasOfertadas();
	}
}
