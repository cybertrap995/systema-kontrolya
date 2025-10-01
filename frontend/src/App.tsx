import { useEffect, useState } from "react";
import api from "./api";

interface Project {
  id: number;
  name: string;
  description: string;
}

interface Defect {
  id: number;
  title: string;
  status: string;
  priority: string;
}

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [defects, setDefects] = useState<Defect[]>([]);

  useEffect(() => {
    api.get<Project[]>("projects/")
      .then((r) => setProjects(r.data))
      .catch((e) => console.error(e));

    api.get<Defect[]>("defects/")
      .then((r) => setDefects(r.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Проекты</h1>
      {projects.length === 0 ? (
        <p>Нет проектов</p>
      ) : (
        <ul>
          {projects.map((p) => (
            <li key={p.id}>
              {p.name} — {p.description}
            </li>
          ))}
        </ul>
      )}

      <h2>Дефекты</h2>
      {defects.length === 0 ? (
        <p>Нет дефектов</p>
      ) : (
        <ul>
          {defects.map((d) => (
            <li key={d.id}>
              {d.title} | {d.status} | {d.priority}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
