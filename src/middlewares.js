export const validarCamposPet = (req, res, next) =>{
    try {
        const { nome, idade, raca, nomeTutor } = req.body;

        if(!nome || !idade || !raca || !nomeTutor){
            return res.status(400).send({
                ok: false,
                mensagem: "Há campos obrigatórios não informados"
            })
        }

        next();
    } catch (error) {
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
}