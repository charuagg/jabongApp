var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var OrderSchema = new mongoose.Schema({
    userId: String,
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

OrderSchema.plugin(mongoosePaginate);

mongoose.model('Order', OrderSchema);