import { Table, TableBody, TableHead, TableHeader, TableRow } from 'bold-ui'
import { HorarioRow } from './HorarioRow'
import { DiaSemana, Horario, HorariosSelecionados } from './model'

export interface GradeHorariosProps {
  horariosSelecionados: HorariosSelecionados
  horarios: Horario[]
  diasSemana: DiaSemana[]
}

// TODO: Deixar esse componente visivel sem internet -> Cenarios: o usuario jah ter logado e nao ter logado
export function GradeHorarios(props: GradeHorariosProps) {
  const { horariosSelecionados, horarios, diasSemana } = props

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader key='vazia' />
          {diasSemana.map((diasSemana) => (
            <TableHeader key={`th-${diasSemana.id}`} style={{ textAlign: 'center' }}>
              {diasSemana.nome}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {horarios.map((horario) => (
          <HorarioRow
            key={`tr-horario-${horario.id}`}
            horario={horario}
            diasSemana={diasSemana}
            horariosSelecionados={horariosSelecionados}
          />
        ))}
      </TableBody>
    </Table>
  )
}
