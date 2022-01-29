module.exports = (services) => {
    const handler = new require("../handler.collection");
    const mongoose = services.config.mongoose;
    const schema = mongoose.Schema;

    const receitas = new schema({
        descricao: {
            type: String,
            required: true            
        },
        valor: {
            type: Number,
            required: true
        },
        data: {
            type: Number,
            required: true
        }
    }, {
        versionKey: false,
        collection: "receitas"
    });

    const receitasModel = mongoose.model('receitas', receitas);
    return new handler(receitasModel);
}