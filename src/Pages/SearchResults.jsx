import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../Style/searchResult.css";

const SearchResults = () => {
  const { searchResult } = useSelector((state) => state.search);
  console.log(searchResult.results);

  return (
    <div className="min-vh-100 container">
      <h1 className="text-info fw-bold w-100 text-center mb-4 mt-5">
        Search-Results
      </h1>

      {searchResult &&
      searchResult.results &&
      searchResult.results.length === 0 ? (
        <h1 className="text-center text-light mt-5">No Results Found</h1>
      ) : (
        <div className="w-100 d-flex flex-row flex-wrap mb-5 mt-4 cards-div">
          {searchResult &&
            searchResult.results &&
            searchResult.results.map(
              (result) =>
                result.poster_path && (
                  <div key={result.id} className="m-3">
                    <Card
                      style={{ width: "18rem" }}
                      className="bg-black card-div"
                    >
                      <Card.Img
                        variant="top"
                        width="20%"
                        className="rounded d-block"
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}`}
                      />
                      <Card.Body>
                        <Card.Title className="text-light mb-4 mt-2 fs-3 fw-semibold text-center">
                          {result.title}
                        </Card.Title>
                        <div className="d-flex justify-content-center">
                          <Link
                            to={`/moviedetails/${result.id}`}
                            className="text-decoration-none"
                          >
                            <Button variant="primary">Movie Details</Button>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                )
            )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
