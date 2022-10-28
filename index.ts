import { Aluno, Materia } from "./classes";

const aluno = new Aluno("Hacker Cyberpunk", 8);
const materia = new Materia("Typescript", 50);

materia.aluno = aluno;
materia.atribuirNota(50, "+");

if (aluno.nota < materia.media) 
{
    console.log("Aluno reprovado!");
} else 
{
    console.log("Aluno aprovado!");
}