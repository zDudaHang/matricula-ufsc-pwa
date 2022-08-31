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

INSERT INTO TB_PROFESSOR (id, nome) VALUES (1, 'Pedro da Paz');
INSERT INTO TB_PROFESSOR (id, nome) VALUES (2, 'Laura Barros');
INSERT INTO TB_PROFESSOR (id, nome) VALUES (3, 'Maria Vitória da Cunha');
INSERT INTO TB_PROFESSOR (id, nome) VALUES (4, 'Alexandre Souza');
INSERT INTO TB_PROFESSOR (id, nome) VALUES (5, 'Helena Lopes');

INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('EEL5105', 90, 'Circuitos e Técnicas Digitais');
INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('INE5401', 36, 'Introdução à Computação');
INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('INE5402', 108, 'Programação Orientada a Objetos I');
INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('INE5403', 108, 'Fundamentos de Matemática Discreta para Computação');
INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('MTM3100', 72, 'Pré-Cálculo');
INSERT INTO TB_DISCIPLINA (codigo, carga_horaria, nome) VALUES ('MTM3101', 72, 'Cálculo 1');

INSERT INTO TB_TURMA (codigo, vagas_ocupadas, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('01208A', 0, 10, 'EEL5105', 1);
INSERT INTO TB_TURMA (codigo, vagas_ocupadas, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('01208B', 0, 10, 'EEL5105', 2);

INSERT INTO TB_TURMA (codigo, vagas_ocupadas, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('03202A', 0, 10, 'INE5401', 3);
INSERT INTO TB_TURMA (codigo, vagas_ocupadas, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('03202B', 0, 10, 'INE5401', 3);

INSERT INTO TB_TURMA (codigo, vagas_ocupadas, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('03208A', 0, 10, 'INE5402', 2);
INSERT INTO TB_TURMA (codigo, vagas_ocupadas, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('3208B', 0, 10, 'INE5402', 4);

INSERT INTO TB_TURMA (codigo, vagas_ocupadas, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('01205D', 0, 10, 'INE5403', 1);
INSERT INTO TB_TURMA (codigo, vagas_ocupadas, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('01205C', 0, 10, 'INE5403', 5);

INSERT INTO TB_TURMA (codigo, vagas_ocupadas, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('08213', 0, 10, 'MTM3100', 4);
INSERT INTO TB_TURMA (codigo, vagas_ocupadas, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('03235', 0, 10, 'MTM3101', 5);