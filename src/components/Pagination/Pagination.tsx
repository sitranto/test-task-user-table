import "./Pagination.css";
import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const [inputValue, setInputValue] = useState(currentPage.toString());

  function handlePageChange(page: number) {
    if (page <= 0) {
      page = 1;
    }
    setCurrentPage(page);
    setInputValue(page.toString());
    localStorage.setItem("current_page", page.toString());
  }
  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(currentPage - 1)}>Назад</button>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => handlePageChange(Number(inputValue))}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }} // по сути вызов другого обработчика TODO проверить можно ли заменить
      />
      <button onClick={() => handlePageChange(currentPage + 1)}>Вперед</button>
    </div>
  );
}
