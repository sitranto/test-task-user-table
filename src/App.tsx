import './App.css'
import Table from "./components/Table/Table.tsx";
import {useEffect, useState} from "react";
import type {User} from "./types/user.ts";
import {getUsers} from "./api/usersApi.ts";
import Pagination from "./components/Pagination/Pagination.tsx";

const LIMIT = 10;

function App() {
    const [userData, setUserData] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(Number(localStorage.getItem("current_page")));

    useEffect(() => {
        if (!currentPage) {
            setCurrentPage(1);
        }
    }, []);

    useEffect(() => {
        getUsers(
            LIMIT,
            (currentPage - 1) * LIMIT,
        ).then((data) => {
            setUserData(data.users);
        });
    }, [currentPage])

  return (
    <>
        <Table data={userData} />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  )
}

export default App
