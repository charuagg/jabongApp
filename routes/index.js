var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Post = mongoose.model('post');
var Comment = mongoose.model('comment');
var Catalog = mongoose.model('Catalog');
var Cart = mongoose.model('Cart');

router.get('/getbrandCatalogData', function(req, res, next) {

    var paginate = {
        page: req.query.pageNo ? req.query.pageNo : 1,
        limit: req.query.pageSize ? req.query.pageSize : 10
    }

    Catalog.paginate({}, paginate, function(err, result) {
        if (err) {
            return next(err);
        }

        res.json(result);
    });

});

router.get('/getCartDataById', function(req, res, next) {

    var id = req.query.id ;

    Cart.findById(id, function(err, result) {
        if (err) {
            return next(err);
        }

        res.json(result);
    });

});

router.post('/addToCart', function(req, res, next) {
    var cart = new Cart(req.body);
    var query = {_id:req.body._id};
    Cart.findOneAndUpdate(query,req.body,{upsert:true,new: true},function(err, cart) {
        if (err) {
            return next(err);
        }

        res.json(cart);
    });
});

router.get('/posts', function(req, res, next) {
    // var queryParam = {
    //     // title: "test3"
    // };
    // Post.find(function(err, posts) {
    //     if (err) {
    //         return next(err);
    //     }

    //     res.json(posts);
    // });

    Post.paginate({}, {
        page: 2,
        limit: 2
    }, function(err, posts) {
        if (err) {
            return next(err);
        }

        res.json(posts);
    });

});

router.post('/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});

router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function(err, post) {
        if (err) {
            return next(err);
        }
        if (!post) {
            return next(new Error('can\'t find post'));
        }

        req.post = post;
        return next();
    });
});

router.get('/posts/:post', function(req, res) {
    res.json(req.post);
});

router.post('/posts/:post/comments', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function(err, comment) {
        if (err) {
            return next(err);
        }

        req.post.comments.push(comment);
        req.post.save(function(err, post) {
            if (err) {
                return next(err);
            }

            res.json(comment);
        });
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

module.exports = router;