var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var CartSchema = new mongoose.Schema({
    _id: String,
    items: [{
    	brandId : String,
        productId: String,
        bucketId : String,
        subcategoryId : Number,
        brandName : String,
        productName : String,
        mrp : String,
        url : String,
        imageUrl : String,
        quantity: Number
    }],
    created: { type: Date, default: Date.now }
});

CartSchema.plugin(mongoosePaginate);

mongoose.model('Cart', CartSchema);