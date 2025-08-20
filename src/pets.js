import { randomUUID} from 'crypto';

export const pets = [
    {
        id: randomUUID(),
        nome: "Kita",
        raca: "Vira-lata",
        idade: 4,
        nomeTutor: "Tiago"
    },
    {
        id: randomUUID(),
        nome: "McQueen",
        raca: "Pug",
        idade: 5,
        nomeTutor: "Jéssica"
    }
]