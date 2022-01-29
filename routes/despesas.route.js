module.exports = (app) => {

    const despesasCollection = app.mongoose.collections.despesas;

    // Cadastro de receitas
    app.post('/despesas', (req, res) => {
        const despesa = req.body;
        try {
            validateDespesa(despesa);
            const retorno = despesasCollection.insert(despesa);
            res.send(retorno);
        } catch (err) {
            res.status(500).send({
                message: err.message
            });
        }
    });

    // Listagem de despesas
    app.get('/despesas', async (req, res) => {
        const despesas = await despesasCollection.find({});
        res.send(despesas);
    });

    // Atualização de despesas
    app.put('/despesas/:id', async (req, res) => {
        try {
            let despesa = req.body;
            despesa._id = req.params.id;
            validateDespesa(despesa, true);
            const retorno = despesasCollection.updateOneById(despesa);
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send({
                message: err.message
            });
        }
    });

    // Detalhe de despesa
    app.get('/despesas/:id', async (req, res) => {
        const id = req.params.id;
        const despesa = await despesasCollection.find({
            _id: id
        })
        console.log(despesa)
        res.send(despesa);
    });

    // Exclusão de despesa
    app.delete('/despesas/:id', async (req, res) => {
        const id = req.params.id;
        await despesasCollection.delete({
            _id: id
        })
        res.sendStatus(200);
    });

    // Função de validação de dados
    function validateDespesa(content, validateId = false) {
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