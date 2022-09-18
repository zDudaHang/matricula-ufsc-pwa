import { HFlow, isEqual, Select, Text, VFlow } from 'bold-ui'
import { useField } from 'react-final-form'
import { BuscarTurmasQuery, useBuscarTurmasQuery } from '../../../generated/graphql'

export type SelectTurmaFieldModel = BuscarTurmasQuery['turmas'][0]

const renderItem = (turma: SelectTurmaFieldModel) => {
  const { disciplina, nomeProfessor, codigo, vagasOfertadas } = turma
  return (
    <VFlow vSpacing={0} style={{ marginLeft: '1rem' }}>
      <Text fontWeight='bold'>
        {disciplina.nome} ({disciplina.codigo}) - Turma {codigo}
      </Text>
      <HFlow>Professor: {nomeProfessor}</HFlow>
      <HFlow>Vagas ofertadas: {vagasOfertadas}</HFlow>
      <HFlow>Carga horária (H/A): {disciplina.cargaHoraria}</HFlow>
    </VFlow>
  )
}

const itemToString = (turma: SelectTurmaFieldModel) => turma?.codigo

const itemIsEqual = (turmaA: SelectTurmaFieldModel, turmaB: SelectTurmaFieldModel) =>
  isEqual(turmaA?.codigo, turmaB?.codigo)

interface SelectTurmaFieldProps {
  name: string
}

export function SelectTurmaField(props: SelectTurmaFieldProps) {
  const { loading, data } = useBuscarTurmasQuery()

  const { input, meta } = useField(props.name)

  return (
    <Select<SelectTurmaFieldModel>
      label='Turmas'
      placeholder='Selecione as turmas que queira se matricular'
      value={input.value}
      error={meta.error}
      onChange={input.onChange}
      items={data?.turmas ?? []}
      loading={loading}
      renderItem={renderItem}
      itemToString={itemToString}
      itemIsEqual={itemIsEqual}
      multiple
      required
      onClear={console.log}
    />
  )
}
