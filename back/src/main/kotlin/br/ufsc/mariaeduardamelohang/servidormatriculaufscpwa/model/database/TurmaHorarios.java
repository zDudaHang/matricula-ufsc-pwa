package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name = "TB_TURMA_HORARIOS")
@Getter
public class TurmaHorarios implements Serializable {

	private static final long serialVersionUID = -701029892833226734L;

	@EmbeddedId
	private TurmaHorariosPrimaryKey id;
}
