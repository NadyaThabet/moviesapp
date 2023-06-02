import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Series from "./Pages/Series";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import MovieDetails from "./Pages/MovieDetails";
import SeriesDetails from "./Pages/SeriesDetails";
import Error from "./Pages/Error";
import SearchResults from "./Pages/SearchResults";

const App = () => {
  return (
    <div className="App bg-black">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/moviedetails/:id" element={<MovieDetails />} />
          <Route path="/seriesdetails/:id" element={<SeriesDetails />} />
          <Route path="/searchresult" element={<SearchResults />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
