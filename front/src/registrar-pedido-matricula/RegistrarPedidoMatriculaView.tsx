import { useEffect, useMemo, useState } from 'react'
import { fetchWithAuthorization } from '../fetch'
import { GradeHorariosProps } from '../grade-horarios/GradeHorarios'
import { TurmaMatriculada } from '../grade-horarios/model'
import { RegistrarPedidoMatriculaForm } from './RegistrarPedidoMatriculaForm'
import { convertTurmasMatriculadasToHorariosSelecionados } from './util'

interface RegistrarPedidoMatriculaViewProps extends Omit<GradeHorariosProps, 'horariosSelecionados'> {}

export function RegistrarPedidoMatriculaView(props: RegistrarPedidoMatriculaViewProps) {
  const [turmasMatriculadas, setTurmasMatriculadas] = useState<TurmaMatriculada[]>([])

  useEffect(() => {
    fetchWithAuthorization('pedidoMatricula').then((response) =>
      response.json().then((turmas: TurmaMatriculada[]) => setTurmasMatriculadas(turmas))
    )
  }, [])

  const horariosSelecionados = useMemo(
    () => convertTurmasMatriculadasToHorariosSelecionados(turmasMatriculadas),
    [turmasMatriculadas]
  )

  return (
    <RegistrarPedidoMatriculaForm
      {...props}
      turmasMatriculadas={turmasMatriculadas}
      horariosSelecionados={horariosSelecionados}
    />
  )
}
