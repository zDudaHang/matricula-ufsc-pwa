import { Table, TableBody, TableHead, TableHeader, TableRow } from 'bold-ui'
import { useField } from 'react-final-form'
import { useBuscarGradeHorariosQuery } from '../generated/graphql'
import { HORARIOS_FIELD_NAME } from '../registrar-pedido-matricula/model'
import { HorarioRow } from './HorarioRow'
import { HorariosSelecionados } from './model'

// TODO: Deixar esse componente visivel sem internet -> Cenarios: o usuario jah ter logado e nao ter logado
export function GradeHorarios() {
  const { data } = useBuscarGradeHorariosQuery()

  const { input: horariosSelecionados } = useField<HorariosSelecionados>(HORARIOS_FIELD_NAME, {
    subscription: { value: true },
  })

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader key='vazia' />
          {data?.diasSemana.map((diasSemana) => (
            <TableHeader key={`th-${diasSemana.id}`}>{diasSemana.nome}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.horarios.map((horario) => (
          <HorarioRow
            key={`tr-horario-${horario.id}`}
            horario={horario}
            diasSemana={data?.diasSemana}
            horariosSelecionados={horariosSelecionados.value}
          />
        ))}
      </TableBody>
    </Table>
  )
}
