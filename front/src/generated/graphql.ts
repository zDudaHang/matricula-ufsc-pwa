import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Aluno = {
  __typename?: 'Aluno';
  iaa: Scalars['Float'];
  matricula: Scalars['String'];
  nome: Scalars['String'];
  nomeUsuario: Scalars['String'];
};

export type DiaSemana = {
  __typename?: 'DiaSemana';
  id: Scalars['Int'];
  nome: Scalars['String'];
};

export type Disciplina = {
  __typename?: 'Disciplina';
  cargaHoraria: Scalars['Int'];
  codigo: Scalars['String'];
  nome: Scalars['String'];
};

export type HorarioAula = {
  __typename?: 'HorarioAula';
  horario: Scalars['String'];
  id: Scalars['Int'];
};

export type HorarioTurma = {
  __typename?: 'HorarioTurma';
  diaSemana: DiaSemana;
  horario: HorarioAula;
  sala: Scalars['String'];
};

export type LoginInput = {
  nomeUsuario: Scalars['String'];
  senha: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  accessToken?: Maybe<Scalars['String']>;
  matriculaAluno?: Maybe<Scalars['String']>;
  sucesso: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginPayload;
  registrarAluno?: Maybe<Aluno>;
  registrarPedidoMatricula: Array<Turma>;
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginInput>;
};


export type MutationRegistrarAlunoArgs = {
  input: RegistrarAlunoInput;
};


export type MutationRegistrarPedidoMatriculaArgs = {
  input: PedidoMatriculaInput;
};

export type PedidoMatriculaInput = {
  codigosTurmas: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  buscarPedidoMatricula: Array<Turma>;
  diasSemana: Array<DiaSemana>;
  horarios: Array<HorarioAula>;
  turmas: Array<Turma>;
};

export type RegistrarAlunoInput = {
  iaa: Scalars['Float'];
  nome: Scalars['String'];
  nomeUsuario: Scalars['String'];
  senha: Scalars['String'];
};

export type Turma = {
  __typename?: 'Turma';
  codigo: Scalars['String'];
  disciplina: Disciplina;
  horarios: Array<HorarioTurma>;
  nomeProfessor: Scalars['String'];
  vagasOfertadas: Scalars['Int'];
};

export type DiaSemanaFragment = { __typename?: 'DiaSemana', id: number, nome: string };

export type HorarioFragment = { __typename?: 'HorarioAula', id: number, horario: string };

export type TurmaFragment = { __typename?: 'Turma', codigo: string, vagasOfertadas: number, nomeProfessor: string, disciplina: { __typename?: 'Disciplina', codigo: string, nome: string, cargaHoraria: number }, horarios: Array<{ __typename?: 'HorarioTurma', sala: string, diaSemana: { __typename?: 'DiaSemana', id: number, nome: string }, horario: { __typename?: 'HorarioAula', id: number, horario: string } }> };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', accessToken?: string | null } };

export type RegistrarAlunoMutationVariables = Exact<{
  input: RegistrarAlunoInput;
}>;


export type RegistrarAlunoMutation = { __typename?: 'Mutation', registrarAluno?: { __typename?: 'Aluno', nomeUsuario: string } | null };

export type BuscarPedidoMatriculaQueryVariables = Exact<{ [key: string]: never; }>;


export type BuscarPedidoMatriculaQuery = { __typename?: 'Query', buscarPedidoMatricula: Array<{ __typename?: 'Turma', codigo: string, vagasOfertadas: number, nomeProfessor: string, disciplina: { __typename?: 'Disciplina', codigo: string, nome: string, cargaHoraria: number }, horarios: Array<{ __typename?: 'HorarioTurma', sala: string, diaSemana: { __typename?: 'DiaSemana', id: number, nome: string }, horario: { __typename?: 'HorarioAula', id: number, horario: string } }> }> };

export type RegistrarPedidoMatriculaMutationVariables = Exact<{
  input: PedidoMatriculaInput;
}>;


export type RegistrarPedidoMatriculaMutation = { __typename?: 'Mutation', registrarPedidoMatricula: Array<{ __typename?: 'Turma', codigo: string, vagasOfertadas: number, nomeProfessor: string, disciplina: { __typename?: 'Disciplina', codigo: string, nome: string, cargaHoraria: number }, horarios: Array<{ __typename?: 'HorarioTurma', sala: string, diaSemana: { __typename?: 'DiaSemana', id: number, nome: string }, horario: { __typename?: 'HorarioAula', id: number, horario: string } }> }> };

export type BuscarGradeHorariosQueryVariables = Exact<{ [key: string]: never; }>;


export type BuscarGradeHorariosQuery = { __typename?: 'Query', horarios: Array<{ __typename?: 'HorarioAula', id: number, horario: string }>, diasSemana: Array<{ __typename?: 'DiaSemana', id: number, nome: string }> };

export type BuscarTurmasQueryVariables = Exact<{ [key: string]: never; }>;


export type BuscarTurmasQuery = { __typename?: 'Query', turmas: Array<{ __typename?: 'Turma', codigo: string, vagasOfertadas: number, nomeProfessor: string, disciplina: { __typename?: 'Disciplina', codigo: string, nome: string, cargaHoraria: number }, horarios: Array<{ __typename?: 'HorarioTurma', sala: string, diaSemana: { __typename?: 'DiaSemana', id: number, nome: string }, horario: { __typename?: 'HorarioAula', id: number, horario: string } }> }> };

export const DiaSemanaFragmentDoc = gql`
    fragment DiaSemana on DiaSemana {
  id
  nome
}
    `;
export const HorarioFragmentDoc = gql`
    fragment Horario on HorarioAula {
  id
  horario
}
    `;
export const TurmaFragmentDoc = gql`
    fragment Turma on Turma {
  codigo
  vagasOfertadas
  nomeProfessor
  disciplina {
    codigo
    nome
    cargaHoraria
  }
  horarios {
    diaSemana {
      ...DiaSemana
    }
    horario {
      ...Horario
    }
    sala
  }
}
    ${DiaSemanaFragmentDoc}
${HorarioFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegistrarAlunoDocument = gql`
    mutation RegistrarAluno($input: RegistrarAlunoInput!) {
  registrarAluno(input: $input) {
    nomeUsuario
  }
}
    `;
export type RegistrarAlunoMutationFn = Apollo.MutationFunction<RegistrarAlunoMutation, RegistrarAlunoMutationVariables>;

/**
 * __useRegistrarAlunoMutation__
 *
 * To run a mutation, you first call `useRegistrarAlunoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistrarAlunoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registrarAlunoMutation, { data, loading, error }] = useRegistrarAlunoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegistrarAlunoMutation(baseOptions?: Apollo.MutationHookOptions<RegistrarAlunoMutation, RegistrarAlunoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistrarAlunoMutation, RegistrarAlunoMutationVariables>(RegistrarAlunoDocument, options);
      }
export type RegistrarAlunoMutationHookResult = ReturnType<typeof useRegistrarAlunoMutation>;
export type RegistrarAlunoMutationResult = Apollo.MutationResult<RegistrarAlunoMutation>;
export type RegistrarAlunoMutationOptions = Apollo.BaseMutationOptions<RegistrarAlunoMutation, RegistrarAlunoMutationVariables>;
export const BuscarPedidoMatriculaDocument = gql`
    query BuscarPedidoMatricula {
  buscarPedidoMatricula {
    ...Turma
  }
}
    ${TurmaFragmentDoc}`;

/**
 * __useBuscarPedidoMatriculaQuery__
 *
 * To run a query within a React component, call `useBuscarPedidoMatriculaQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuscarPedidoMatriculaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuscarPedidoMatriculaQuery({
 *   variables: {
 *   },
 * });
 */
export function useBuscarPedidoMatriculaQuery(baseOptions?: Apollo.QueryHookOptions<BuscarPedidoMatriculaQuery, BuscarPedidoMatriculaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuscarPedidoMatriculaQuery, BuscarPedidoMatriculaQueryVariables>(BuscarPedidoMatriculaDocument, options);
      }
export function useBuscarPedidoMatriculaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuscarPedidoMatriculaQuery, BuscarPedidoMatriculaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuscarPedidoMatriculaQuery, BuscarPedidoMatriculaQueryVariables>(BuscarPedidoMatriculaDocument, options);
        }
export type BuscarPedidoMatriculaQueryHookResult = ReturnType<typeof useBuscarPedidoMatriculaQuery>;
export type BuscarPedidoMatriculaLazyQueryHookResult = ReturnType<typeof useBuscarPedidoMatriculaLazyQuery>;
export type BuscarPedidoMatriculaQueryResult = Apollo.QueryResult<BuscarPedidoMatriculaQuery, BuscarPedidoMatriculaQueryVariables>;
export const RegistrarPedidoMatriculaDocument = gql`
    mutation RegistrarPedidoMatricula($input: PedidoMatriculaInput!) {
  registrarPedidoMatricula(input: $input) {
    ...Turma
  }
}
    ${TurmaFragmentDoc}`;
export type RegistrarPedidoMatriculaMutationFn = Apollo.MutationFunction<RegistrarPedidoMatriculaMutation, RegistrarPedidoMatriculaMutationVariables>;

/**
 * __useRegistrarPedidoMatriculaMutation__
 *
 * To run a mutation, you first call `useRegistrarPedidoMatriculaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistrarPedidoMatriculaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registrarPedidoMatriculaMutation, { data, loading, error }] = useRegistrarPedidoMatriculaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegistrarPedidoMatriculaMutation(baseOptions?: Apollo.MutationHookOptions<RegistrarPedidoMatriculaMutation, RegistrarPedidoMatriculaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistrarPedidoMatriculaMutation, RegistrarPedidoMatriculaMutationVariables>(RegistrarPedidoMatriculaDocument, options);
      }
export type RegistrarPedidoMatriculaMutationHookResult = ReturnType<typeof useRegistrarPedidoMatriculaMutation>;
export type RegistrarPedidoMatriculaMutationResult = Apollo.MutationResult<RegistrarPedidoMatriculaMutation>;
export type RegistrarPedidoMatriculaMutationOptions = Apollo.BaseMutationOptions<RegistrarPedidoMatriculaMutation, RegistrarPedidoMatriculaMutationVariables>;
export const BuscarGradeHorariosDocument = gql`
    query BuscarGradeHorarios {
  horarios {
    ...Horario
  }
  diasSemana {
    ...DiaSemana
  }
}
    ${HorarioFragmentDoc}
${DiaSemanaFragmentDoc}`;

/**
 * __useBuscarGradeHorariosQuery__
 *
 * To run a query within a React component, call `useBuscarGradeHorariosQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuscarGradeHorariosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuscarGradeHorariosQuery({
 *   variables: {
 *   },
 * });
 */
export function useBuscarGradeHorariosQuery(baseOptions?: Apollo.QueryHookOptions<BuscarGradeHorariosQuery, BuscarGradeHorariosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuscarGradeHorariosQuery, BuscarGradeHorariosQueryVariables>(BuscarGradeHorariosDocument, options);
      }
export function useBuscarGradeHorariosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuscarGradeHorariosQuery, BuscarGradeHorariosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuscarGradeHorariosQuery, BuscarGradeHorariosQueryVariables>(BuscarGradeHorariosDocument, options);
        }
export type BuscarGradeHorariosQueryHookResult = ReturnType<typeof useBuscarGradeHorariosQuery>;
export type BuscarGradeHorariosLazyQueryHookResult = ReturnType<typeof useBuscarGradeHorariosLazyQuery>;
export type BuscarGradeHorariosQueryResult = Apollo.QueryResult<BuscarGradeHorariosQuery, BuscarGradeHorariosQueryVariables>;
export const BuscarTurmasDocument = gql`
    query BuscarTurmas {
  turmas {
    ...Turma
  }
}
    ${TurmaFragmentDoc}`;

/**
 * __useBuscarTurmasQuery__
 *
 * To run a query within a React component, call `useBuscarTurmasQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuscarTurmasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuscarTurmasQuery({
 *   variables: {
 *   },
 * });
 */
export function useBuscarTurmasQuery(baseOptions?: Apollo.QueryHookOptions<BuscarTurmasQuery, BuscarTurmasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuscarTurmasQuery, BuscarTurmasQueryVariables>(BuscarTurmasDocument, options);
      }
export function useBuscarTurmasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuscarTurmasQuery, BuscarTurmasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuscarTurmasQuery, BuscarTurmasQueryVariables>(BuscarTurmasDocument, options);
        }
export type BuscarTurmasQueryHookResult = ReturnType<typeof useBuscarTurmasQuery>;
export type BuscarTurmasLazyQueryHookResult = ReturnType<typeof useBuscarTurmasLazyQuery>;
export type BuscarTurmasQueryResult = Apollo.QueryResult<BuscarTurmasQuery, BuscarTurmasQueryVariables>;