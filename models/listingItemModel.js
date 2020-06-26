const mongoose = require('../services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const dataSetItemSchema = new Schema({
    itemId: Number,
    keywords: [{type: String}]
});

dataSetItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
dataSetItemSchema.set('toJSON', {
    virtuals: true
});


const DataSetItem = mongoose.model('DataSetItem', dataSetItemSchema);

exports.createItem = (itemData) => {
    const dataSetItem = new DataSetItem(itemData);
    return dataSetItem.save();
};

