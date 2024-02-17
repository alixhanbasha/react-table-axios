import React, { useState, useEffect, ChangeEvent, FC, useMemo } from "react";

import UserApiService from "../utils/UserApiService";
import IUserData from '../types/IUserData';
import Table from "./Table";


const UserList: FC = () => {
    const [users, setUsers] = useState<Array<IUserData>>([]);
    const [searchName, setSearchName] = useState<string>("");
    const [filter, setFilter] = useState<string>("");
    const [filterValue, setFilterValue] = useState<string>("");

    useEffect(() => {
        retrieveUsers();
    }, []);

    const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const onChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        const filter = e.target.value;
        setFilter(filter);
    };

    const onChangeFilterValue = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilterValue(value);
    };

    const getData = async (page: number) => {
        await UserApiService.get25Users(page)
            .then((response: any) => {
                setUsers(response.data.users);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const retrieveUsers = async () => {
        await UserApiService.get25Users(0)
            .then((response: any) => {
                setUsers(response.data.users);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const findByName = async () => {
        await UserApiService.findByName(searchName)
            .then((response: any) => {
                setUsers(response.data.users);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const findWithFilter = async () => {
        await UserApiService.filterUser(filter, filterValue)
            .then((response: any) => {
                setUsers(response.data.users);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'firstName' },
        { Header: 'Last Name', accessor: 'lastName' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Address', accessor: 'address.address' },
        { Header: 'City', accessor: 'address.city' },
        { Header: 'State', accessor: 'address.state' },
        // Add more columns as needed
    ];

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <select onChange={onChangeFilter}>
                        <option selected disabled>
                            Choose one
                        </option>
                        <option value="age">Age</option>
                        <option value="email">Email</option>
                        <option value="username">Username</option>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="maidenName">Maiden Name</option>
                    </select>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Provide a filter"
                        value={filterValue}
                        onChange={onChangeFilterValue}
                    />

                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findWithFilter}
                        >
                            Search by filter
                        </button>
                    </div>
                </div>
            </div>

            {users.length > 0 && <Table columns={columns} data={users} /> || <>Could not find anything</>}

            <div className="d-flex gap-2 justify-content-end">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => getData(0)}
                >
                    1
                </button>

                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => getData(25)}
                >
                    2
                </button>

                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => getData(50)}
                >
                    3
                </button>

                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => getData(75)}
                >
                    4
                </button>
            </div>

        </div>
    );
};

export default UserList;