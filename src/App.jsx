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
console.log("API Key:", API_KEY);
const BASE_URL = "https://api.unsplash.com/search/photos";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page);
  }, [query, page]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);
  

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

      console.log("API Response:", response.data);

      if (response.data.results.length === 0) {
        toast.error("No images found. Try another search.");
        return;
      }

      setImages((prevImages) =>
        page === 1 ? response.data.results : [...prevImages, ...response.data.results]
      );
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching images:", error);
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

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => {
      if (prevIndex === null || images.length === 0) return prevIndex;
      const newIndex = (prevIndex + 1) % images.length;
      setSelectedImage(images[newIndex]); 
      return newIndex;
    });
  };
  
  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) => {
      if (prevIndex === null || images.length === 0) return prevIndex;
      const newIndex = (prevIndex - 1 + images.length) % images.length;
      setSelectedImage(images[newIndex]); 
      return newIndex;
    });
  };
  

  return (
    <div className="app">
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery
        images={images}
        onImageClick={(image) => {
          setSelectedImage(image);
          setSelectedImageIndex(images.findIndex((img) => img.id === image.id));
        }}
      />
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
      {selectedImage && selectedImageIndex !== null && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};

export default App;
