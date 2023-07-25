import ReactPaginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Typography } from '@material-tailwind/react';
import EventCardMusician from '../cards/EventCardMusician';

const PaginationEvents = ({ itemsPerPage, events, header, isHome, userId }) => {
  const [itemOffset, setItemOffset] = useState(0); //initial state
  const endOffset = itemOffset + itemsPerPage; //last item to present
  const currentItems = events?.data?.slice(itemOffset, endOffset); //array of current items
  const pageCount = Math.ceil(events?.data?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % events?.data?.length;
    setItemOffset(newOffset);
  };
  //make query to check if user already registered to event if true change the text in the button and disabled the button
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
      {isHome ? (
        <div className="flex flex-col items-center  mt-10">
          <Typography variant="h2" className="text-center mb-5  ">
            {header}
          </Typography>
          {events?.data?.length !== 0 ? (
            <div className="grid lg:grid-rows-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:grid-cols-1">
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
        <div className="flex flex-col items-center  mt-10">
          <Typography variant="h2" className="text-center mb-5  ">
            {header}
          </Typography>
          {events?.data?.length !== 0 ? (
            <div className="grid lg:grid-rows-1 md:grid-cols-2  lg:grid-cols-3 gap-4 sm:grid-cols-1">
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
