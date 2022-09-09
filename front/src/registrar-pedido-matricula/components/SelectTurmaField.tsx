import { HFlow, isEqual, Select, Text, VFlow } from 'bold-ui'
import { BuscarTurmasQuery, useBuscarTurmasQuery } from '../../generated/graphql'

type Turma = BuscarTurmasQuery['turmas'][0]

const renderItem = (turma: Turma) => {
  const { disciplina, nomeProfessor, codigo, vagasOfertadas } = turma
  return (
    <VFlow vSpacing={0} style={{ marginLeft: '1rem' }}>
      <Text fontWeight='bold'>
        {disciplina.nome} ({disciplina.codigo}) - Turma {codigo}
      </Text>
      <HFlow>Professor: {nomeProfessor}</HFlow>
      <HFlow>Vagas ofertadas: {vagasOfertadas}</HFlow>
    </VFlow>
  )
}

const itemToString = (turma: Turma) => turma.codigo

const itemIsEqual = (turmaA: Turma, turmaB: Turma) => isEqual(turmaA.codigo, turmaB.codigo)

export function SelectTurmaField() {
  const { loading, data } = useBuscarTurmasQuery()

  return (
    <Select<Turma>
      label='Turmas'
      items={data?.turmas ?? []}
      loading={loading}
      multiple
      renderItem={renderItem}
      itemToString={itemToString}
      itemIsEqual={itemIsEqual}
      required
      placeholder='Selecione as turmas que queira se matricular'
    />
  )
}
