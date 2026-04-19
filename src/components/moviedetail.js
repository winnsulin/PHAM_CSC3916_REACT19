import React, { useEffect } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom'; // Import useParams
import { useState } from 'react';


const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams(); // Get movieId from URL parameters
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading); // Assuming you have a loading state in your reducer
  const error = useSelector(state => state.movie.error); // Assuming you have an error state in your reducer


  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const DetailInfo = () => {
    if (loading) {
      return <div>Loading....</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!selectedMovie) {
      return <div>No movie data available.</div>;
    }

    return (
  <Card className="bg-dark text-dark p-4 rounded">
    <Card.Header>Movie Detail</Card.Header>

    <Card.Body>
      <Image 
        className="image" 
        src={selectedMovie.imageUrl} 
        thumbnail 
      />
    </Card.Body>

    <ListGroup>
      <ListGroupItem>{selectedMovie.title}</ListGroupItem>

      // Add review
      <ListGroupItem>
        {selectedMovie.actors?.map((actor, i) => (
          <p key={i}>
            <b>{actor.actorName}</b> {actor.characterName}
          </p>
        ))}
      </ListGroupItem>
        <Card.Body className="bg-light text-dark mt-3">
        <h5>Add Review</h5>

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <br />

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review..."
        />

        <br />

        <button onClick={submitReview}>Submit Review</button>
      </Card.Body>

      <ListGroupItem>
        <h4>
          <BsStarFill /> {selectedMovie.avgRating?.toFixed(1) || 0}
        </h4>
      </ListGroupItem>
    </ListGroup>
    
    // Show review list
    <Card.Body className="card-body bg-white">
      {selectedMovie.movieReviews?.map((review, i) => (
        <p key={i}>
          <b>{review.username}</b> {review.review} <BsStarFill /> {review.rating}
        </p>
      ))}
    </Card.Body>
  </Card>
  
  
);
};
  return <DetailInfo />;
};


export default MovieDetail;
