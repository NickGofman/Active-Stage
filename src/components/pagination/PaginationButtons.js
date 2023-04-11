import ReactPaginate from "react-paginate"
import {BsChevronLeft,BsChevronRight} from "react-icons/bs"
const PaginationButtons = () => {
  return (
    <div>
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          <span className="w-8 h-8 flex items-center justify-center bg-gray-500 rounded-full ml-4">
            <BsChevronRight />
          </span>
        }
        // onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={10}
        previousLabel={
          <span className="w-8 h-8 flex items-center justify-center bg-gray-500 rounded-md mr-4 ">
            <BsChevronLeft />
          </span>
        }
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block w-8 h-8  border border-solid border-gray-300 hover:bg-gray-300 w-10 h-10 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-light-blue-300 text-white"
      />
    </div>
  );
}
export default PaginationButtons