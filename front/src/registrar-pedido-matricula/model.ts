// Modelagem associada ao retorno do PedidoMatriculaController

export interface TurmaControllerModel {
  codigo: string
  vagasOfertadas: number
  disciplina: Disciplina
  professor: Professor
  horarios: HorarioTurmaControllerModel[]
}

export interface HorarioTurmaControllerModel {
  id: {
    diaSemana: {
      id: number
      nome: string
    }
    horario: {
      id: number
      horario: string
    }
    sala: string
  }
}

interface Disciplina {
  codigo: string
  nome: string
  cargaHoraria: number
}

interface Professor {
  id: number
  nome: string
}