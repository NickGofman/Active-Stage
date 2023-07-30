import ReactPaginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Typography } from '@material-tailwind/react';
import EventCardMusician from '../cards/EventCardMusician';

const PaginationEvents = ({ itemsPerPage, events, header, isHome, userId }) => {
  // State to manage the current offset (index) of the events array
  const [itemOffset, setItemOffset] = useState(0);

  // Calculate the end offset based on the current offset and itemsPerPage
  const endOffset = itemOffset + itemsPerPage;

  // Get the current items to display on the current page
  const currentItems = events?.data?.slice(itemOffset, endOffset);

  // Calculate the total number of pages required for pagination
  const pageCount = Math.ceil(events?.data?.length / itemsPerPage);

  // Function to handle page change when user clicks on a pagination button
  const handlePageClick = (event) => {
    // Calculate the new offset based on the selected page
    const newOffset = (event.selected * itemsPerPage) % events?.data?.length;
    setItemOffset(newOffset);
  };

  // Framer Motion variants for pagination animation
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };
  return (
    <>
      {/* Display events based on the 'isHome' prop */}
      {isHome ? (
        <div className="flex flex-col items-center  mt-10 ">
          <Typography variant="h2" className="text-center mb-5  ">
            {header}
          </Typography>
          {events?.data?.length !== 0 ? (
            <div
              className={
                events?.data?.length <= 3
                  ? 'grid lg:grid-rows-1 md:grid-cols-2 lg:flex lg:flex-wrap gap-4 sm:grid-cols-1'
                  : 'grid lg:grid-rows-2 md:grid-cols-2 lg:flex lg:flex-wrap gap-4 sm:grid-cols-1'
              }
            >
              {currentItems?.map((event) => (
                <EventCardMusician
                  userId={userId}
                  key={event.EventID}
                  eventId={event.EventID}
                  date={event.Date}
                  type={event.MusicalTypeName}
                  description={event.Description}
                />
              ))}
            </div>
          ) : (
            <Typography variant="h4" className="text-center">
              NO Open Events
            </Typography>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center  mt-10 dark:bg-black">
          <Typography variant="h2" className="text-center mb-5  ">
            {header}
          </Typography>
          {events?.data?.length !== 0 ? (
            <div className="grid lg:grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:grid-cols-1">
              {currentItems?.map((event) => (
                <EventCardMusician
                  key={event.EventID}
                  eventId={event.EventID}
                  userId={userId}
                  date={event.Date}
                  type={event.MusicalTypeName}
                  description={event.Description}
                  header={header}
                />
              ))}
            </div>
          ) : (
            <Typography variant="h4" className="text-center">
              No Events
            </Typography>
          )}
        </div>
      )}
      {/* Pagination */}
      <motion.div
        variants={paginationVariants}
        initial="hidden"
        animate="visible"
      >
        <ReactPaginate
          breakLabel={<span className="mr-4">...</span>}
          nextLabel={
            <span className="w-8 h-8 flex items-center justify-center bg-gray-500 rounded-full ml-4">
              <BsChevronRight />
            </span>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={
            <span className="w-8 h-8 flex items-center justify-center bg-gray-500 rounded-full mr-4 ">
              <BsChevronLeft />
            </span>
          }
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center mt-8 mb-4"
          activeLinkClassName="bg-light-blue-300 text-white"
          pageLinkClassName="block w-8 h-8  border border-solid border-gray-300 hover:bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full mr-4"
        />
      </motion.div>
    </>
  );
};
export default PaginationEvents;
