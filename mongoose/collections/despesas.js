module.exports = (services) => {
    const handler = new require("../handler.collection");
    const mongoose = services.config.mongoose;
    const schema = mongoose.Schema;

    const despesas = new schema({
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
        collection: "despesas"
    });

    const despesasModel = mongoose.model('despesas', despesas);
    return new handler(despesasModel);
}