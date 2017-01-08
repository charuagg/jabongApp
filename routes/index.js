var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Post = mongoose.model('post');
var Comment = mongoose.model('comment');
var Catalog = mongoose.model('Catalog');
var Cart = mongoose.model('Cart');
var Order = mongoose.model('Order');

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

var getKartDataByIdAndAddItem = function(req, res, next){

    var id = req.body._id ;
    var items = req.body.items[0];

    Cart.findById(id, function(err, result) {
        if (err) {
            return next(err);
        }
        console.log("items : "+ items);
        if(result){
            result.items.unshift(items);
            req.kartData = result;
        }else{
            req.kartData = req.body;
        }
        console.log("result : "+ result);
        console.log("req.kartData : "+ req.kartData);
        next();
    });
}

var getKartDataByIdAndRemoveItem = function(req, res, next){

    var id = req.body._id ;
    var item = req.body.item;

    Cart.findById(id, function(err, result) {
        if (err) {
            return next(err);
        }
        console.log("result : "+ result);
        var kartItems = [];
        var index = -1;
        if(result){
            kartItems = result.items;
            for(var i=0 ; i<kartItems.length ; i++){
                var kartItem = kartItems[i];
                if(kartItem.productId === item.productId){
                    index = i;
                    break;
                }
            }

            // index = kartItems.indexOf(item);
            console.log("index : "+ index);
            // result.item.push(item);
            // req.kartData = result;
        }
        if(index != -1){
            // res.json(kartItems[index]);
            kartItems.splice(index,1);
            result.items = kartItems;
            req.kartData = result;
            next();
        }else{
            return next(new Error('can\'t find the remove item'));
        }
        
        // console.log("result : "+ result);
        // console.log("req.kartData : "+ req.kartData);
        
    });
}

var getKartDataByIdForChange = function (req,res,next){

    var id = req.body._id;
    var item = req.body.item;

    Cart.findById(id,function (err, result) {
        if (err) {
            return next(err);
        }
        if(result){
            var kartItems = [];
            kartItems=result.items;
            var kartItem;
            for(var i=0 ; i<kartItems.length ; i++){
               kartItem = kartItems[i];
               if(kartItem.productId === item.productId){
                  kartItem.quantity=item.quantity 
                   break;
               } 
           }
        
        }
        req.kartData= result;
        next();        
    });

}

var saveKartData = function(req, res, next){

    var query = {_id:req.kartData._id};
    Cart.findOneAndUpdate(query,req.kartData,{upsert:true,new: true},function(err, cart) {
        if (err) {
            return next(err);
        }

        res.json(cart);
        // next();
    });
}

router.post('/addToCart',[getKartDataByIdAndAddItem,saveKartData]);

router.post('/removeItemFromCart',[getKartDataByIdAndRemoveItem,saveKartData]);

router.post('/changeQuantity',[getKartDataByIdForChange,saveKartData]);


router.post('/addToOrder',function(req, res ,next) {
    var order = new Order(req.body);

    order.save(function(err, order) {
        if (err) {
            return next(err);
        }

        res.json(order);
    });
});

// router.post('/addToCart', function(req, res, next) {
//     var cart = new Cart(req.body);
//     var query = {_id:req.body._id};
//     Cart.findOneAndUpdate(query,req.body,{upsert:true,new: true},function(err, cart) {
//         if (err) {
//             return next(err);
//         }

//         res.json(cart);
//     });
// });

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