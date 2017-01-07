var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var CartSchema = new mongoose.Schema({
    _id: String,
    items: [{
        supc: String,
        quantity: Number
    }],
    created: { type: Date, default: Date.now }
});

CartSchema.plugin(mongoosePaginate);

mongoose.model('Cart', CartSchema);