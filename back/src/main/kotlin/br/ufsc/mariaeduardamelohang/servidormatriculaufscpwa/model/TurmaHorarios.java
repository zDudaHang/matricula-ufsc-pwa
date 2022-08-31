package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "TB_TURMA_HORARIOS")
public class TurmaHorarios implements Serializable {

	private static final long serialVersionUID = -701029892833226734L;

	@EmbeddedId
	TurmaHorariosPrimaryKey id;

	@Column(nullable = false)
	String sala;
}
