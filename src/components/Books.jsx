import BookCard from "./BookCard";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const Books = ({
  isSearchClicked,
  searchTerm,
  books,
  fetchMoreBooks,
  totalItems,
}) => {
  console.log(books.length <= totalItems);
  return (
    <div className="mt-4">
      <h2 className="font-semibold text-2xl lg:text-3xl mb-1">
        Results for <em>{isSearchClicked ? searchTerm : "..."}</em>
      </h2>

      {isSearchClicked && (
        <InfiniteScroll
          dataLength={books.length}
          next={fetchMoreBooks}
          loader={<h4>Loading...</h4>}
          hasMore={books.length <= totalItems && books.length !== 0}
        >
          <div className="grid pt-4 gap-4 sm:grid-cols-2 md:px-8 lg:px-0 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard
                key={book?.id}
                title={book?.volumeInfo?.title}
                description={book?.volumeInfo?.description}
                authors={book?.volumeInfo?.authors}
                categories={book?.volumeInfo?.categories}
                averageRating={book?.volumeInfo?.averageRating}
                thumbnail={book?.volumeInfo?.imageLinks?.thumbnail}
                previewLink={book?.volumeInfo?.previewLink}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

Books.propTypes = {
  isSearchClicked: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  fetchMoreBooks: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default Books;
