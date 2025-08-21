import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { pets } from './pets.js';
import { randomUUID } from 'crypto';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Definir rotas
// Listar todos os pets (GET /pets)
app.get("/pets", (req, res) => {
    try {

        res.status(200).send({
            ok: true,
            mensagem: "Pets listados com sucesso",
            dados: pets
        });

    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

// Criar um novo pet (POST /pets)
app.post("/pets", (req, res) => {
    try {
        //entrada
        const { nome, idade, raca, nomeTutor} = req.body;

        //processamento
        const novoPet = {
            id: randomUUID(),
            nome,
            raca,
            idade,
            nomeTutor
        };

        pets.push(novoPet);

        //saída
        res.status(201).send({
            ok: true,
            mensagem: "Pet cadastrado com sucesso",
            dados: pets
        })

    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

// Obter um pet pelo ID (GET/pets/:id) 
app.get("/pets/:id",(req,res) => {
    try {
        //entrada
        const { id } = req.params;
        //processamento
        const pet = pets.find(item => item.id === id);
        if(!pet){
            return res.status(404).send({
                ok: false,
                mensagem: "Pet não encontrado"
            });
        } 
        //saida
        res.status(200).send({
            ok: true,
            mensagem: "Pet encontrado com sucesso",
            dados: pet
        });

    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

//Atualizar um pet existente pelo ID (PUT/pets/:id)
app.put("/pets/:id", (req,res) => {
    try {
        //entrada
        const { id } = req.params;
        const { nome, raca, idade, nomeTutor } = req.body;

        //processamento
        const pet = pets.find(item => item.id === id);
        if(!pet){
            return res.status(404).send({
                ok: false,
                mensagem: "Pet não encontrado"
            });
        } 

        pet.nome = nome;
        pet.raca = raca;
        pet.idade = idade;
        pet.nomeTutor = nomeTutor;

        //saida
        res.status(200).send({
            ok: true,
            mensagem: "Pet atualizado com sucesso",
            dados: pets
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

// Excluir um pet existente (DELETE /pets/:id)

app.delete("/pets/:id", (req, res) => {
    try {
        //entrada
        const { id } = req.params;
        //processamento
        const petIndex = pets.findIndex(item => item.id === id);
        if(petIndex < 0){
            return res.status(404).send({
                ok: false,
                mensagem: "Pet não encontrado"
            });
        } 

        pets.splice(petIndex, 1);

        //saida
        res.status(200).send({
            ok: true,
            mensagem: "Pet excluido com sucesso!",
            dados: pets
        })
        
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log(`O servidor esta rodando na porta ${porta}`);
});

