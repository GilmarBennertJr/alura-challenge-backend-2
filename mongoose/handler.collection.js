module.exports = class Handler {

    constructor (model) {
        this.model = model;
    }

    async find (filter) {
        return await this.model.find(filter);
    }

    async insert(content) {
        const instance = new this.model(content);
        return await instance.save();
    }

    async updateOneById(content) {
        if (content._id) {
            return await this.model.findOneAndUpdate({
                _id: content._id
            }, content);
        }
    }

    async delete(filter) {
        return await this.model.deleteOne(filter);
    }

}