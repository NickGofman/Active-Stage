import { useEffect, useState } from 'react';
// get event data for pagination
const useFetch = (eventData) => {
  // Set the total number of pages
  const totalPages = 300;

  // State to store the array of event data
  const [pages, setPages] = useState([]);

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(0);

  // Set the pages state with the eventData once (equivalent to componentDidMount)
  useEffect(() => {
    setPages(eventData);
  }, []);
  return {
    pages,
    totalPages,
    currentPage,
    setCurrentPage,
  };
};
export default useFetch;
