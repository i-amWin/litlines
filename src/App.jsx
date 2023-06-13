import { useState } from "react";
import axios from "axios";
import Books from "./components/Books";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchBooks = async () => {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${new URLSearchParams(
        searchTerm
      ).toString()}&maxResults=14&startIndex=${startIndex}`
    );
    setTotalItems(result?.data?.totalItems);
    return result?.data?.items;
  };

  const handleSearchClick = async () => {
    setIsSearchClicked(true);
    const books = (await fetchBooks()) || [];

    setBooks(books);
    setStartIndex((startIndex) => startIndex + 14);
  };

  const fetchMoreBooks = async () => {
    const moreBooks = await fetchBooks();
    setBooks((books) => [...books, ...moreBooks]);
    setStartIndex((startIndex) => startIndex + 14);
  };

  return (
    <div className="max-w-[1050px] mx-auto">
      <div className="mb-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider">
          Litlines
        </h1>
        <p>Search books by Lines</p>
      </div>
      <div>
        <label htmlFor="searchInput">We are waiting for your input.</label>
        <div>
          <input
            className="px-3 py-2 w-full max-w-xl my-1 rounded-md text-black sm:w-2/3 sm:mr-2"
            type="text"
            id="searchInput"
            placeholder="Enter here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="mt-1 px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800"
            onClick={() => handleSearchClick()}
          >
            Find Books
          </button>
        </div>
      </div>

      <Books
        isSearchClicked={isSearchClicked}
        searchTerm={searchTerm}
        books={books}
        fetchMoreBooks={fetchMoreBooks}
        totalItems={totalItems}
      />
    </div>
  );
}

export default App;
