import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getSeriesCredits,
  getSeriesDetails,
} from "../Redux/Slices/DetailsSlice";
import { FcFlashOn } from "react-icons/fc";
import { HiDocumentAdd } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import "../Style/seriesDetails.css";

const SeriesDetails = () => {
  const { id } = useParams();
  const { seriesDetails, seriesCredits, seriesTrailer } = useSelector(
    (state) => state.details
  );

  console.log(seriesTrailer);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeriesDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getSeriesCredits(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1 className="text-info fw-bold w-100 text-center mb-4 mt-4">
        Series-Details
      </h1>
      <div>
        <div className="container whole-div">
          <div className="text-info fw-bold text-center mt-4 mb-4 col-5 d-flex justify-content-center img-div">
            <img
              src={
                seriesDetails &&
                seriesDetails.poster_path &&
                `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${seriesDetails.poster_path}`
              }
              width="80%"
              className="rounded d-block mt-3"
              alt={seriesDetails.name}
            />
          </div>
          <div className="text-info fw-bold d-flex flex-column mt-4 mb-4 col-7 txt-dv">
            <div>
              <h1 className="text-light fw-bold">{seriesDetails.name}</h1>
              <span className="text-light fw-normal">
                {seriesDetails.first_air_date}{" "}
              </span>
              {seriesDetails && seriesDetails.original_language && (
                <span className="text-light fw-normal">
                  {" "}
                  ({seriesDetails.original_language.toUpperCase()}){" "}
                </span>
              )}
              <FcFlashOn />{" "}
              {seriesDetails && seriesDetails.genres && (
                <span className="text-light fw-normal">
                  {seriesDetails.genres.map((genre) => genre.name).join(", ")}{" "}
                </span>
              )}
              <FcFlashOn />{" "}
              <span className="text-light fw-normal ms-1">
                {Math.floor(seriesDetails.episode_run_time / 60)}h{" "}
                {seriesDetails.episode_run_time % 60}min
              </span>
            </div>
            <div>
              <h3 className="text-primary fw-bold mt-5">
                OverView:{" "}
                {seriesDetails.overview ? (
                  <span className="text-light fw-lighter fs-5">
                    {seriesDetails.overview}
                  </span>
                ) : (
                  <span className="text-light fs-5 ms-2">Not Found !!</span>
                )}
              </h3>
            </div>
            <div>
              <h3 className="text-primary fw-bold mt-4">Casting:</h3>
              <div className="mt-4 row">
                <div className="container">
                  <div className="col-12 mt-3 d-flex flex-row w-100 justify-content-between cst-dv">
                    {seriesCredits &&
                      seriesCredits.cast &&
                      seriesCredits.cast.slice(0, 3).map((actor) => (
                        <div className="text-light" key={actor.id}>
                          <h3 className="text-light fs-4">{actor.name} </h3>
                          <h6 className="text-warning mb-5">
                            {actor.known_for_department}
                          </h6>
                        </div>
                      ))}
                  </div>
                  <div className="col-12 ms-5 mt-3 d-flex flex-row w-100 justify-content-between cst-div">
                    {seriesCredits &&
                      seriesCredits.crew &&
                      seriesCredits.crew.slice(0, 3).map((member) => (
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
                  <Modal.Body className="w-100 bg-black rounded text-center">
                    {seriesTrailer ? (
                      seriesTrailer.key ? (
                        <iframe
                          width="465"
                          height="315"
                          src={`https://www.youtube.com/embed/${seriesTrailer.key}`}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowfullscreen
                        ></iframe>
                      ) : (
                        <span className="text-light w-100 vh-100 fw-semibold fs-3 p-5">
                          No Trailer Found !
                        </span>
                      )
                    ) : (
                      <span className="text-light w-100 vh-100 fw-semibold fs-3 p-5">
                        No Trailer Found !
                      </span>
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
        <Link to="/series">
          <button type="button" className="btn btn-primary mb-4">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SeriesDetails;
