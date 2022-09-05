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

INSERT INTO TB_TURMA (codigo, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('01208A', 10, 'EEL5105', 1);
INSERT INTO TB_TURMA (codigo, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('01208B', 10, 'EEL5105', 2);

INSERT INTO TB_TURMA (codigo, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('03202A', 10, 'INE5401', 3);
INSERT INTO TB_TURMA (codigo, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('03202B', 10, 'INE5401', 3);

INSERT INTO TB_TURMA (codigo, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('03208A', 10, 'INE5402', 2);
INSERT INTO TB_TURMA (codigo, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('3208B', 10, 'INE5402', 4);

INSERT INTO TB_TURMA (codigo, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('01205D', 10, 'INE5403', 1);
INSERT INTO TB_TURMA (codigo, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('01205C', 10, 'INE5403', 5);

INSERT INTO TB_TURMA (codigo, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('08213', 10, 'MTM3100', 4);
INSERT INTO TB_TURMA (codigo, vagas_ofertadas, codigo_disciplina, id_professor) VALUES ('03235', 10, 'MTM3101', 5);

-- TODO: Arrumar os horários depois para ter conflitos !
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01208A', 'EFI204', 1, 2, 4);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01208A', 'EFI204', 2, 4, 6);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01208A', 'LABSDG', 4, 1, 3);

INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01208B', 'CTC304', 1, 2, 4);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01208B', 'CTC304', 2, 4, 6);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01208B', 'LABSDG', 4, 1, 3);

INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('03202A', 'CTC304', 1, 2, 4);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('03202A', 'CTC304', 2, 4, 6);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('03202A', 'LABSDG', 4, 1, 3);

INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('03202B', 'CTC304', 1, 2, 4);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('03202B', 'CTC304', 2, 4, 6);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('03202B', 'LABSDG', 4, 1, 3);

INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01205D', 'CTC304', 1, 2, 4);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01205D', 'CTC304', 2, 4, 6);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01205D', 'LABSDG', 4, 1, 3);

INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01205C', 'CTC304', 1, 2, 4);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01205C', 'CTC304', 2, 4, 6);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('01205C', 'LABSDG', 4, 1, 3);

INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('08213', 'CTC304', 1, 2, 4);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('08213', 'CTC304', 2, 4, 6);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('08213', 'LABSDG', 4, 1, 3);

INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('03235', 'CTC304', 1, 2, 4);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('03235', 'CTC304', 2, 4, 6);
INSERT INTO TB_TURMA_HORARIOS(turma_codigo, sala, dia_semana_id, horario_inicio_id, horario_final_id) VALUES ('03235', 'LABSDG', 4, 1, 3);