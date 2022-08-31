CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO TB_HORARIO (horario) VALUES ('07:30');
INSERT INTO TB_HORARIO (horario) VALUES ('08:20');
INSERT INTO TB_HORARIO (horario) VALUES ('09:10');
INSERT INTO TB_HORARIO (horario) VALUES ('10:10');
INSERT INTO TB_HORARIO (horario) VALUES ('11:00');
INSERT INTO TB_HORARIO (horario) VALUES ('11:50');

INSERT INTO TB_HORARIO (horario) VALUES ('13:30');
INSERT INTO TB_HORARIO (horario) VALUES ('14:20');
INSERT INTO TB_HORARIO (horario) VALUES ('15:10');
INSERT INTO TB_HORARIO (horario) VALUES ('16:20');
INSERT INTO TB_HORARIO (horario) VALUES ('17:10');
INSERT INTO TB_HORARIO (horario) VALUES ('18:00');

INSERT INTO TB_HORARIO (horario) VALUES ('18:30');
INSERT INTO TB_HORARIO (horario) VALUES ('19:20');
INSERT INTO TB_HORARIO (horario) VALUES ('20:20');
INSERT INTO TB_HORARIO (horario) VALUES ('21:10');
INSERT INTO TB_HORARIO (horario) VALUES ('22:00');

INSERT INTO TB_DIA_SEMANA (nome) VALUES ('Segunda-feira');
INSERT INTO TB_DIA_SEMANA (nome) VALUES ('Terça-feira');
INSERT INTO TB_DIA_SEMANA (nome) VALUES ('Quarta-feira');
INSERT INTO TB_DIA_SEMANA (nome) VALUES ('Quinta-feira');
INSERT INTO TB_DIA_SEMANA (nome) VALUES ('Sexta-feira');
INSERT INTO TB_DIA_SEMANA (nome) VALUES ('Sábado');

INSERT INTO TB_PROFESSOR (matricula, nome) VALUES (uuid_generate_v4(), 'Pedro da Paz');
INSERT INTO TB_PROFESSOR (matricula, nome) VALUES (uuid_generate_v4(), 'Laura Barros');
INSERT INTO TB_PROFESSOR (matricula, nome) VALUES (uuid_generate_v4(), 'Maria Vitória da Cunha');
INSERT INTO TB_PROFESSOR (matricula, nome) VALUES (uuid_generate_v4(), 'Alexandre Souza');
INSERT INTO TB_PROFESSOR (matricula, nome) VALUES (uuid_generate_v4(), 'Helena Lopes');

INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('EEL5105', 90, 'Circuitos e Técnicas Digitais');
INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('INE5401', 36, 'Introdução à Computação');
INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('INE5402', 108, 'Programação Orientada a Objetos I');
INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('INE5403', 108, 'Fundamentos de Matemática Discreta para Computação');
INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('MTM3100', 72, 'Pré-Cálculo');
INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('MTM3101', 72, 'Cálculo 1');