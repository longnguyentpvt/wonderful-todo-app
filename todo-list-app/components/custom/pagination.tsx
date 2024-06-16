import React, { memo } from "react";
import Pagination from "react-bootstrap/Pagination";

interface PaginateProps {
  page: number;
  total: number;
  noRecords: number;
  onPageChange?: (page: number) => void;
}

const Paginate: React.FC<PaginateProps> = ({
  page, total, noRecords, onPageChange
}) => {
  const totalPages = Math.ceil(total / noRecords);
  const items: React.ReactNode[] = [];

  const handleClick = (number: number): void => {
    if (onPageChange) {
      onPageChange(number);
    }
  };

  // Calculate the range to display
  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, page + 2);

  // Ensure there are always 5 items displayed if possible
  if (page <= 3) {
    end = Math.min(5, totalPages);
  } else if (page >= totalPages - 2) {
    start = Math.max(totalPages - 4, 1);
  }

  // First page and ellipsis before
  if (start > 1) {
    items.push(
      <Pagination.Item key={ 1 } active={ page === 1 } onClick={ () => handleClick(1) }>
        1
      </Pagination.Item>
    );
    if (start > 2) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }
  }

  for (let number = start; number <= end; number += 1) {
    items.push(
      <Pagination.Item key={ number } active={ number === page } onClick={ () => handleClick(number) }>
        { number }
      </Pagination.Item>
    );
  }

  // Last page and ellipsis after
  if (end < totalPages) {
    if (end < totalPages - 1) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }
    items.push(
      <Pagination.Item key={ totalPages } active={ page === totalPages } onClick={ () => handleClick(totalPages) }>
        { totalPages }
      </Pagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-end">
      <Pagination>
        <Pagination.First onClick={ () => handleClick(1) } disabled={ page === 1 } />
        <Pagination.Prev onClick={ () => handleClick(page - 1) } disabled={ page === 1 } />
        { items }
        <Pagination.Next onClick={ () => handleClick(page + 1) } disabled={ page === totalPages } />
        <Pagination.Last onClick={ () => handleClick(totalPages) } disabled={ page === totalPages } />
      </Pagination>
    </div>
  );
};

export default memo(Paginate);
