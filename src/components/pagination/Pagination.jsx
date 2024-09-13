import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ skip, setSkip, totalPages, limit }) => {
  const currentPage = skip / limit + 1; // Calculate the current page based on skip and limit

  const next = () => {
    if (currentPage < totalPages) {
      setSkip(skip + limit); // Increment skip by limit
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setSkip(skip - limit); // Decrement skip by limit
    }
  };

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => setSkip((index - 1) * limit),
    disabled: totalPages === 0,
  });

  const renderPageNumbers = () => {
    const pageButtons = [];
    const maxVisiblePages = 3; // Number of pages around the current page to display

    // Always show the first page
    pageButtons.push(
      <IconButton key={1} {...getItemProps(1)}>
        1
      </IconButton>
    );

    // Show ellipsis if the current page is far from the first page
    if (currentPage > maxVisiblePages + 2) {
      pageButtons.push(<span key="left-ellipsis">...</span>);
    }

    // Show the current page and its neighbors (4, 5, 6, 7)
    const startPage = Math.max(2, currentPage - 1); // Start one page before the current page
    const endPage = Math.min(totalPages - 1, currentPage + 2); // End two pages after the current page

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <IconButton key={i} {...getItemProps(i)}>
          {i}
        </IconButton>
      );
    }

    // Show ellipsis if the current page is far from the last page
    if (currentPage < totalPages - maxVisiblePages - 1) {
      pageButtons.push(<span key="right-ellipsis">...</span>);
    }

    // Always show the last page
    pageButtons.push(
      <IconButton key={totalPages} {...getItemProps(totalPages)}>
        {totalPages}
      </IconButton>
    );

    return pageButtons;
  };

  return (
    <div className="flex items-center gap-4 justify-center my-2">
      <Button
        variant="text"
        className="flex items-center gap-2 text-blue-gray-600"
        onClick={prev}
        disabled={currentPage === 1 || totalPages === 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">{renderPageNumbers()}</div>
      <Button
        variant="text"
        className="flex items-center gap-2 text-blue-gray-600"
        onClick={next}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
