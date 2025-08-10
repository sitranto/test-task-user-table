import './App.css'
import Table from "./components/Table/Table.tsx";
import {useEffect, useState} from "react";
import type {Address, User} from "./types/user.ts";
import {getUsers} from "./api/usersApi.ts";
import Pagination from "./components/Pagination/Pagination.tsx";
import type {SortOrder} from "./types/sort.ts";
import FilterBox from "./components/FilterBox/FilterBox.tsx";

const LIMIT = 10;

function App() {
    const [userData, setUserData] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem("current_page")));
    const [sortConfig, setSortConfig] = useState<{ key: keyof User | keyof Address; order: SortOrder } | null>(null);
    const [filterConfig, setFilterConfig] = useState<{ key: keyof User; value: string } | null>(null);


    useEffect(() => {
        if (!currentPage) {
            setCurrentPage(1);
        }
    }, []);

    useEffect(() => {
        getUsers(
            LIMIT,
            (currentPage - 1) * LIMIT,
            sortConfig?.key,
            sortConfig?.order,
            filterConfig?.key,
            filterConfig?.value
        ).then((data) => {
            setUserData(data.users);
        });
    }, [currentPage, sortConfig, filterConfig]);

    function handleSort(key: keyof User | keyof Address) {
        let order: SortOrder = 'asc';
        if (sortConfig?.key === key && sortConfig.order === 'asc') {
            order = 'desc';
        }
        if (sortConfig?.key === key && sortConfig.order === 'desc') {
            order = null;
        }
        setSortConfig({ key, order });
    }

    function handleFilter(key: keyof User, value: string) {
        setFilterConfig({key, value});
    }

  return (
    <>
        <FilterBox onFilterChange={handleFilter} />
        <Table data={userData} onSort={handleSort} sortConfig={sortConfig} />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  )
}

export default App
