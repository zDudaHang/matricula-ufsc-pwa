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

export type Disciplina = {
  __typename?: 'Disciplina';
  cargaHoraria: Scalars['Int'];
  nome: Scalars['String'];
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
  buscarPedidoMatricula: Array<TurmaSolicitada>;
};

export type RegistrarAlunoInput = {
  iaa: Scalars['Float'];
  nome: Scalars['String'];
  nomeUsuario: Scalars['String'];
  senha: Scalars['String'];
};

export enum StatusSolicitacao {
  FilaEspera = 'FILA_ESPERA',
  VagaGarantida = 'VAGA_GARANTIDA'
}

export type Turma = {
  __typename?: 'Turma';
  codigo: Scalars['String'];
  disciplina: Disciplina;
  nomeProfessor: Scalars['String'];
  vagasOfertadas: Scalars['Int'];
};

export type TurmaSolicitada = {
  __typename?: 'TurmaSolicitada';
  posicaoNaFilaEspera?: Maybe<Scalars['Int']>;
  status?: Maybe<StatusSolicitacao>;
  turma: Turma;
};

export type PedidoMatriculaQueryVariables = Exact<{ [key: string]: never; }>;


export type PedidoMatriculaQuery = { __typename?: 'Query', buscarPedidoMatricula: Array<{ __typename?: 'TurmaSolicitada', status?: StatusSolicitacao | null, posicaoNaFilaEspera?: number | null, turma: { __typename?: 'Turma', codigo: string } }> };


export const PedidoMatriculaDocument = gql`
    query PedidoMatricula {
  buscarPedidoMatricula {
    turma {
      codigo
    }
    status
    posicaoNaFilaEspera
  }
}
    `;

/**
 * __usePedidoMatriculaQuery__
 *
 * To run a query within a React component, call `usePedidoMatriculaQuery` and pass it any options that fit your needs.
 * When your component renders, `usePedidoMatriculaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePedidoMatriculaQuery({
 *   variables: {
 *   },
 * });
 */
export function usePedidoMatriculaQuery(baseOptions?: Apollo.QueryHookOptions<PedidoMatriculaQuery, PedidoMatriculaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PedidoMatriculaQuery, PedidoMatriculaQueryVariables>(PedidoMatriculaDocument, options);
      }
export function usePedidoMatriculaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PedidoMatriculaQuery, PedidoMatriculaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PedidoMatriculaQuery, PedidoMatriculaQueryVariables>(PedidoMatriculaDocument, options);
        }
export type PedidoMatriculaQueryHookResult = ReturnType<typeof usePedidoMatriculaQuery>;
export type PedidoMatriculaLazyQueryHookResult = ReturnType<typeof usePedidoMatriculaLazyQuery>;
export type PedidoMatriculaQueryResult = Apollo.QueryResult<PedidoMatriculaQuery, PedidoMatriculaQueryVariables>;