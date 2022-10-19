package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.database;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TB_TURMA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Turma implements Serializable {

	private static final long serialVersionUID = 1848354516429296191L;

	@Id
	private String codigo;

	@Column(nullable = false)
	private int vagasOfertadas;

	@ManyToOne
	@JoinColumn(name = "id_professor", nullable = false, referencedColumnName = "id")
	private Professor professor;

	@ManyToOne
	@JoinColumn(name = "codigo_disciplina", nullable = false, referencedColumnName = "codigo")
	private Disciplina disciplina;

	@OneToMany(mappedBy = "id.turma")
	private List<TurmaHorarios> horarios;
}