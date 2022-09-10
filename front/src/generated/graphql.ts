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
  registrarPedidoMatricula?: Maybe<Scalars['Int']>;
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
  nomeProfessor: Scalars['String'];
  vagasOfertadas: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', accessToken?: string | null } };

export type RegistrarAlunoMutationVariables = Exact<{
  input: RegistrarAlunoInput;
}>;


export type RegistrarAlunoMutation = { __typename?: 'Mutation', registrarAluno?: { __typename?: 'Aluno', nomeUsuario: string } | null };

export type BuscarGradeHorariosQueryVariables = Exact<{ [key: string]: never; }>;


export type BuscarGradeHorariosQuery = { __typename?: 'Query', horarios: Array<{ __typename?: 'HorarioAula', id: number, horario: string }>, diasSemana: Array<{ __typename?: 'DiaSemana', id: number, nome: string }> };

export type BuscarTurmasQueryVariables = Exact<{ [key: string]: never; }>;


export type BuscarTurmasQuery = { __typename?: 'Query', turmas: Array<{ __typename?: 'Turma', codigo: string, vagasOfertadas: number, nomeProfessor: string, disciplina: { __typename?: 'Disciplina', codigo: string, nome: string, cargaHoraria: number } }> };


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
export const BuscarGradeHorariosDocument = gql`
    query BuscarGradeHorarios {
  horarios {
    id
    horario
  }
  diasSemana {
    id
    nome
  }
}
    `;

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
    codigo
    vagasOfertadas
    nomeProfessor
    disciplina {
      codigo
      nome
      cargaHoraria
    }
  }
}
    `;

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