import './App.css'
import Table from "./components/Table/Table.tsx";
import {useEffect, useState} from "react";
import type {User} from "./types/user.ts";
import {getUsers} from "./api/usersApi.ts";

const LIMIT = 10;

function App() {
    const [userData, setUserData] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getUsers(
            LIMIT,
            (currentPage - 1) * LIMIT,
        ).then((data) => {
            setUserData(data.users);
        });
    }, [])

  return (
    <>
      <Table data={userData} />
    </>
  )
}

export default App
