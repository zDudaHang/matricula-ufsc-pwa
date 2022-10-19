package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoMatriculaPrimaryKey implements Serializable {

	private static final long serialVersionUID = 2964997141275501320L;

	@ManyToOne
	@MapsId
	@JsonIgnore
	private Turma turma;

	@ManyToOne
	@MapsId
	@JsonIgnore
	private Aluno aluno;
}
