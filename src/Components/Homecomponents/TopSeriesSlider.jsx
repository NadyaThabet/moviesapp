import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopseries } from "../../Redux/Slices/HomeSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ShowMoreText from "react-show-more-text";

const TopSeriesSlider = () => {
  const { topseries } = useSelector((state) => state.homeSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopseries());
  }, [dispatch]);

  const rating = {
    starRatedColor: "yellow",
    numberOfStars: 5,
    starDimension: "15px",
    starSpacing: "1px",
  };

  return (
    <div className="mt-5 mb-5 container">
      <h1 className="text-info mt-5 fw-bold">Top Series</h1>
      <div className="row  grid gap-4 justify-content-center mt-4">
        {topseries.map((show, index) => (
          <Card
            style={{ width: "18rem" }}
            key={index}
            className="col-3 bg-dark text-light"
          >
            <Card.Img
              className="mt-3"
              variant="top"
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${show.poster_path}`}
            />
            <Card.Body>
              <Card.Title className="fw-bold">Title: {show.name}</Card.Title>
              <ShowMoreText
                lines={2}
                more="Show more"
                less="Show less"
                className="text-decoration-none"
                width={280}
                truncatedEndingComponent={"... "}
              >
                <Card.Text>{show.overview}</Card.Text>
              </ShowMoreText>
              <div className="d-flex flex-row w-100 justify-content-between">
                <Card.Title>Rate: {show.vote_average}</Card.Title>
                <Card.Title>
                  <StarRatings
                    {...rating}
                    rating={Math.round(show.vote_average) / 2}
                  />
                </Card.Title>
              </div>
              <div className="w-100 d-flex justify-content-center align-items-center mt-4">
                <Link to={`/seriesdetails/${show.id}`}>
                  <Button variant="primary">Details</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopSeriesSlider;
