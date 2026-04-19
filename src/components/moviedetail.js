import React, { useEffect, useState } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();

  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading);
  const error = useSelector(state => state.movie.error);

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  // SUBMIT REVIEW FUNCTION
  const submitReview = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          movieId: selectedMovie._id,
          rating,
          review
        })
      });

      if (res.ok) {
        dispatch(fetchMovie(movieId));
        setReview("");
        setRating(5);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedMovie) return <div>No movie data</div>;

  return (
    <Card className="bg-dark text-white p-4 rounded">
      <Card.Header>Movie Detail</Card.Header>

      <Card.Body>
        <Image src={selectedMovie.imageUrl} thumbnail />
      </Card.Body>

      <ListGroup>
        <ListGroupItem>{selectedMovie.title}</ListGroupItem>

        <ListGroupItem>
          {selectedMovie.actors?.map((actor, i) => (
            <p key={i}>
              <b>{actor.actorName}</b> {actor.characterName}
            </p>
          ))}
        </ListGroupItem>

        <ListGroupItem>
          <h4>
            <BsStarFill /> {selectedMovie.avgRating?.toFixed(1) || 0}
          </h4>
        </ListGroupItem>
      </ListGroup>

      {/* ADD REVIEW FORM */}
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

      {/* REVIEW LIST */}
      <Card.Body className="bg-white text-dark">
        {selectedMovie.movieReviews?.map((r, i) => (
          <p key={i}>
            <b>{r.username}</b> {r.review} <BsStarFill /> {r.rating}
          </p>
        ))}
      </Card.Body>
    </Card>
  );
};

export default MovieDetail;