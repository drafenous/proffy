import React, { useState, useEffect, useCallback } from "react";

import PageHeader from "../../components/PageHeader";

import "./styles.css";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [subject, setSubject] = useState<string>("");
  const [week_day, setWeekDay] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const handleSearchTeachers = useCallback(async () => {
    const params = { subject, week_day, time };
    const response = await api.get("/classes", { params });
    return setTeachers(response.data);
  }, [subject, week_day, time]);

  useEffect(() => {
    if (!subject || !week_day || !time) {
      return;
    }
    handleSearchTeachers();
  }, [subject, week_day, time, handleSearchTeachers]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Este são os proffys disponíveis">
        <form id="search-teachers">
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação Física", label: "Educação Física" },
              { value: "Física", label: "Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "História", label: "História" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
              { value: "Química", label: "Química" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
