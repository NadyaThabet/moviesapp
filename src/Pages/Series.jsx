import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ShowMoreText from "react-show-more-text";
import { getSeries } from "../Redux/Slices/SeriesSlice";
import Pagination from "react-bootstrap/Pagination";
import {
  firstPage,
  lastPage,
  nextPage,
  prevPage,
} from "../Redux/Slices/PagesCounter";

const AllSeries = () => {
  const { series } = useSelector((state) => state.allSeriesSlice);
  const { page } = useSelector((state) => state.pages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeries(page));
  }, [dispatch, page]);

  const rating = {
    starRatedColor: "yellow",
    numberOfStars: 5,
    starDimension: "15px",
    starSpacing: "1px",
  };

  return (
    <div className="mt-1 mb-3 container">
      <div className="w-100 d-flex flex-column align-items-center mb-2">
        <h1 className="text-info mt-5 fw-bold text-canter">Series</h1>
      </div>
      <div className="row  grid gap-4 justify-content-center mt-4 mb-5">
        {series.map((show, index) => (
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
              <Card.Title className="fw-bold">
                Title: {show.name.split(":")[0]}
              </Card.Title>
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
      <div className="w-100 d-flex justify-content-center">
        <Pagination>
          <Pagination.First
            onClick={() => dispatch(firstPage())}
            disabled={page === 1 && true}
          />
          <Pagination.Prev
            onClick={() => dispatch(prevPage())}
            disabled={page === 1 && true}
          />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next
            onClick={() => dispatch(nextPage())}
            disabled={page === 500 && true}
          />
          <Pagination.Last
            onClick={() => dispatch(lastPage())}
            disabled={page === 500 && true}
          />
        </Pagination>
      </div>
    </div>
  );
};
export default AllSeries;
