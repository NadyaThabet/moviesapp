import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getMovieTrailer,
  getMoviesCredits,
  getMoviesDetails,
} from "../Redux/Slices/DetailsSlice";
import { FcFlashOn } from "react-icons/fc";
import { HiDocumentAdd } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Style/moviesDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const { moviesDetails, moviesCredits, moviesTrailer } = useSelector(
    (state) => state.details
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getMoviesCredits(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getMovieTrailer(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1 className="text-info fw-bold w-100 text-center mb-4 mt-4">
        Movie-Details
      </h1>
      <div>
        <div className="container whole-div">
          <div className="text-info fw-bold text-center mt-4 mb-4 col-5 d-flex justify-content-center img-div">
            <img
              src={
                moviesDetails.poster_path &&
                `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${moviesDetails.poster_path}`
              }
              width="80%"
              className="rounded d-block mt-3"
              alt={moviesDetails.title}
            />
          </div>
          <div className="text-info fw-bold d-flex flex-column mt-4 mb-4 col-7 txt-dv">
            <div>
              <h1 className="text-light fw-bold">{moviesDetails.title}</h1>
              <span className="text-light fw-normal">
                {moviesDetails.release_date}{" "}
              </span>
              {moviesDetails && moviesDetails.original_language && (
                <span className="text-light fw-normal me-1">
                  {" "}
                  ({moviesDetails.original_language.toUpperCase()}){" "}
                </span>
              )}
              <FcFlashOn />{" "}
              {moviesDetails && moviesDetails.genres && (
                <span className="text-light fw-normal">
                  {moviesDetails.genres.map((genre) => genre.name).join(", ")}{" "}
                </span>
              )}
              <FcFlashOn />{" "}
              <span className="text-light fw-normal">
                {Math.floor(moviesDetails.runtime / 60)}h{" "}
                {moviesDetails.runtime % 60}min
              </span>
            </div>
            <div>
              <h3 className="text-primary fw-bold mt-5">
                OverView:{" "}
                {moviesDetails.overview ? (
                  <span className="text-light fw-lighter fs-5 view-text">
                    {moviesDetails.overview}
                  </span>
                ) : (
                  <span className="text-light fs-5 ms-2">Not Found</span>
                )}
              </h3>
            </div>
            <div>
              <h3 className="text-primary fw-bold mt-4">Casting:</h3>
              <div className="mt-4 row">
                <div className="container">
                  <div className="col-12 mt-3 d-flex flex-row w-100 justify-content-between cst-dv">
                    {moviesCredits &&
                      moviesCredits.cast &&
                      moviesCredits.cast.slice(0, 3).map((actor) => (
                        <div className="text-light" key={actor.id}>
                          <h3 className="text-light fs-4">{actor.name} </h3>
                          <h6 className="text-warning mb-5">
                            {actor.known_for_department}
                          </h6>
                        </div>
                      ))}
                  </div>
                  <div className="col-12 mt-3 d-flex flex-row w-100 justify-content-between cst-div">
                    {moviesCredits &&
                      moviesCredits.crew &&
                      moviesCredits.crew.slice(0, 3).map((member) => (
                        <div className="text-light" key={member.id}>
                          <h3 className="text-light fs-4">{member.name} </h3>
                          <h6 className="text-warning mb-5">
                            {member.known_for_department}
                          </h6>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-evenly align-items-end mb-5">
              <div className="d-flex flex-column align-items-center">
                <HiDocumentAdd className="fs-3 text-success" />
                <span className="text-light mt-3">Add To Watch List</span>
              </div>
              <div className="d-flex flex-column align-items-center">
                <AiOutlineStar className="fs-3 text-warning" />
                <span className="text-light mt-3">Rate Movie</span>
              </div>
              <div className="d-flex flex-column align-items-center">
                <Button variant="" onClick={handleShow}>
                  <BsFillPlayCircleFill className="fs-4 text-danger" />
                </Button>
                <Modal show={show} onHide={handleClose} className="mt-5">
                  <Modal.Body className="w-100 bg-black rounded">
                    {moviesTrailer ? (
                      moviesTrailer.key && (
                        <iframe
                          width="465"
                          height="315"
                          src={`https://www.youtube.com/embed/${moviesTrailer.key}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowfullscreen
                        ></iframe>
                      )
                    ) : (
                      <span className="text-light">No Trailer Found !</span>
                    )}
                  </Modal.Body>
                </Modal>
                <span className="text-light mt-2">Play Trailer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 d-flex justify-content-center mb-4">
        <Link to="/movies">
          <button type="button" className="btn btn-primary mb-4">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MovieDetails;
