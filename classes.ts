export class Aluno {
    
    constructor(
        public nome: string, 
        public idade: number, 
        private cpf?: string,
        public nota: number = 0
    ){}

}

export class Materia {
    constructor(
        public nome: string,
        public media: number,
        public aluno?: Aluno
    ){}

    public atribuirNota(nota: number, operador: string){
        this.aluno!.nota = eval(`${this.aluno!.nota} ${operador} ${nota}`);
    }

}