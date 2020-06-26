DataSetItem = require('../models/listingItemModel');


exports.new = async function (req, res) {
    let dataSetItem = new DataSetItem(
        req.body.itemId,
        req.body.keywords
    ); 
};
