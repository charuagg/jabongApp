var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var CatalogSchema = new mongoose.Schema({
    brandId: String,
    bucketId: String,
    subcategoryId: Number,
    brandName: String,
    productName: String,
    mrp: String,
    url: String,
    imageUrl: String
});

CatalogSchema.plugin(mongoosePaginate);

mongoose.model('Catalog', CatalogSchema);