import { useEffect, useState } from 'react';

const useFetch = (eventData) => {
  const totalPages = 300;
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
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
