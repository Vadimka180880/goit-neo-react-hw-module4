import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css"; 

const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = "https://api.unsplash.com/search/photos";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page);
  }, [query, page]);

  const fetchImages = async (query, page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
          query,
          page,
          per_page: 12,
          client_id: API_KEY,
        },
      });

      if (response.data.results.length === 0) {
        toast.error("No images found. Try another search.");
        return;
      }

      setImages((prevImages) => (page === 1 ? response.data.results : [...prevImages, ...response.data.results]));
      setTotalPages(response.data.total_pages);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (newQuery) => {
    if (newQuery === query) {
      toast("You are already viewing results for this query.");
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="app">
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={setSelectedImage} />
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default App;
