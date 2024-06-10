import { useState, useEffect } from 'react';
import { Stack, Pagination } from '@mui/material';

const Jobs = ({ itemsPerPage, items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(items.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, itemsPerPage, items]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Stack spacing={1}>
        <Pagination
          count={Math.ceil(items.length / itemsPerPage)}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
      <div>
        {currentItems.map((item, index) => (
          <div key={index}>
            {/* Render your item component here */}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
