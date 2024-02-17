import React, { useState, useEffect, ChangeEvent, FC, useMemo } from "react";

import UserApiService from "../utils/UserApiService";
import IUserData from '../types/IUserData';
import Table from "./Table";

const UserList: FC = (props: any) => {
    const [users, setUsers] = useState<Array<IUserData>>([]);
    const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
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

    const onPaginationClick = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        let pagination = index === 1 ? 0
            : index === 2 ? 25
                : index === 3 ? 50
                    : 75;

        UserApiService.get25Users(pagination)
            .then((response: any) => {
                setUsers(response.data); // TODO
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const retrieveUsers = async () => {
        await UserApiService.get25Users()
            .then((response: any) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveUsers();
        setCurrentUser(null);
        setCurrentIndex(-1);
    };

    const setActiveUser = (tutorial: IUserData, index: number) => {
        setCurrentUser(tutorial);
        setCurrentIndex(index);
    };

    const openUserProfile = (userid: string) => {
        console.log("Should open user profile.")
    }

    const findByName = () => {
        UserApiService.findByName(searchName)
            .then((response: any) => {
                setUsers(response.data);
                setCurrentUser(null);
                setCurrentIndex(-1);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const findWithFilter = () => {
        UserApiService.filterUser(filter, filterValue)
            .then((response: any) => {
                setUsers(response.data);
                setCurrentUser(null);
                setCurrentIndex(-1);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const columns = [
        {
          Header: "Title",
          accessor: "title",
        },
        {
          Header: "Description",
          accessor: "description",
        },
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
            

            <Table columns={columns} data={users}></Table>


        </div>
    );
};

export default UserList;