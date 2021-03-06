const express = require('express')
// const router = express.Router();

const Review = require('../models/review.js')
const Comment = require('../models/comment.js')

module.exports = function(app) {
/*
    //HOME
    app.get('/', (req, res) => {
        Review.find()
            .then(reviews => {
                res.render('reviews-index', {reviews: reviews});
            })
            .catch(err => {
                console.logg(err);
            });
    });
*/

    //Review-CREATE
    app.post('/reviews', (req, res) => {
        Review.create(req.body)
        .then((review) => {
        console.log(review);
            res.redirect('/');
        })
            .catch((err) => {
                console.log(err.message);
                res.send('ERROR')
      })
    })

    //NEW
    app.get('/movies/:movieId/reviews/new', (req, res) => {
        res.render('reviews-new', { movieId: req.params.movieId })
    })


    //SHOW
    app.get('/reviews/:id', (req, res) => {
      // find review
      Review.findById(req.params.id).then(review => {
        // fetch its comments
        Comment.find({ reviewId: req.params.id }).then(comments => {
          // respond with the template with both values
          res.render('reviews-show', { review: review, comments: comments })
        })
      }).catch((err) => {
        // catch errors
        console.log(err.message)
      });
    });


    //EDIT
    app.get('/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', {review: review});
        })
        .catch((err) => {
            console.log(err.message)
        })
    })


    //UPDATE
    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
    })

    //DELETE
    app.delete('/reviews/:id' , function (req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err.message);
        })
    })

}


//module.exports = reviews;
