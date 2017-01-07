var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var PostSchema = new mongoose.Schema({
  title: String,
  // link: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
});

PostSchema.plugin(mongoosePaginate);

mongoose.model('post', PostSchema);