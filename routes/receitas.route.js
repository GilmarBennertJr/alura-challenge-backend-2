module.exports = (app) => {

    const receitasCollection = app.mongoose.collections.receitas;

    // Cadastro de receitas
    app.post('/receitas', (req, res) => {
        const receita = req.body;
        try {
            validateReceita(receita);
            const retorno = receitasCollection.insert(receita);
            res.send(retorno);
        } catch (err) {
            res.status(500).send({
                message: err.message
            });
        }
    });

    // Listagem de receitas
    app.get('/receitas', async (req, res) => {
        const receitas = await receitasCollection.find({});
        res.send(receitas);
    });

    // Atualização de receitas
    app.put('/receitas/:id', async (req, res) => {
        try {
            let receita = req.body;
            receita._id = req.params.id;
            validateReceita(receita, true);
            const retorno = receitasCollection.updateOneById(receita);
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send({
                message: err.message
            });
        }
    });

    // Detalhe de receita
    app.get('/receitas/:id', async (req, res) => {
        const id = req.params.id;
        const receita = await receitasCollection.find({
            _id: id
        })
        console.log(receita)
        res.send(receita);
    });

    // Exclusão de receita
    app.delete('/receitas/:id', async (req, res) => {
        const id = req.params.id;
        await receitasCollection.delete({
            _id: id
        })
        res.sendStatus(200);
    });

    // Função de validação de dados
    function validateReceita(content, validateId = false) {
        if (validateId) {
            if (!content._id) {
                throw new Error("Id inválido! verifique.");
            }
        } else if (content._id) {
            throw new Error("Não é possível inserir registro duplicado!");
        }

        if (!content.descricao || !content.valor || !content.data) {
            throw new Error("Dados obrigatório inválido!");
        }
    }
    

}