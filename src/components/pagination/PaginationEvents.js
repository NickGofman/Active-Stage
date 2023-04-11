import ReactPaginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Typography } from '@material-tailwind/react';
import EventCardMusician from '../eventView/EventCardMusician';

const PaginationEvents = ({ itemsPerPage, events }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = events.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(events.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % events.length;
    setItemOffset(newOffset);
  };
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
      <div className="flex flex-col items-center  mt-10">
        <Typography variant="h2" className="text-center mb-5  ">
          Upcoming Events
        </Typography>
        <div className="grid lg:grid-rows-2 lg:grid-cols-3 gap-4 sm:grid-cols-1">
          {currentItems.map((event) => (
            <EventCardMusician
              key={event.id}
              date={event.date}
              hour={event.hour}
              type={event.type}
              description={event.description}
            />
          ))}
        </div>
      </div>
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
