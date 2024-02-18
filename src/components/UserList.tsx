import React, { useState, useEffect, ChangeEvent, FC, useMemo } from "react";

import UserApiService from "../utils/UserApiService";
import IUserData from '../types/IUserData';
import Table from "./Table";
import Pagination from "./Pagination";


const UserList: FC = () => {
    const [users, setUsers] = useState<Array<IUserData>>([]);
    const [searchName, setSearchName] = useState<string>("");
    const [filter, setFilter] = useState<string>("");
    const [filterValue, setFilterValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

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
        await UserApiService.getUsersPerPage(page, 25)
            .then((response: any) => {
                setUsers(response.data.users);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const retrieveUsers = async () => {
        setLoading(true)
        await UserApiService.getUsersPerPage(100, 0)
            .then((response: any) => {
                console.log({ resp: response.data });
                setUsers(response.data.users);
                setTotal(response.data.total);
                // set error empty
            })
            .catch((e: Error) => {
                // set error message
                console.log(e);
            }).finally(() => {
                setLoading(false);
            }
            )
    };

    // const findByName = async () => {
    //     setSearching(true);
    //     await UserApiService.findByName(searchName)
    //         .then((response: any) => {
    //             setUsers(response.data.users);
    //             setTotal(response.data.total);
    //         })
    //         .catch((e: Error) => {
    //             console.log(e);
    //         }).finally(() => {  
    //             if(searchName.length < 1){
    //                 setSearching(false);
    //                 getData(currentPage);
    //             }
    //         });
    // };

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
        { title: 'ID', prop: 'id' ,isSortable: true,
      isFilterable: true},
        { title: 'Name', prop: 'firstName' ,isSortable: true,
      isFilterable: true},
        { title: 'Last Name', prop: 'lastName' ,isSortable: true,
      isFilterable: true},
        { title: 'Email', prop: 'email' ,isSortable: true,
      isFilterable: true},
        { title: 'Address', prop: 'address.address' ,
      isFilterable: true},
        { title: 'City', prop: 'address.city' ,isSortable: true,
      isFilterable: true},
        { title: 'State', prop: 'address.state' ,isSortable: true,
      isFilterable: true},
        // Add more columns as needed
    ];

    const handlePagination = (pageNumber: number) => {
        getData(pageNumber)
        setCurrentPage(pageNumber);
    };

    return (
        <div className="list row">
            {/* <div className="col-md-8">
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
            </div> */}

{ loading ? <div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
:
             <Table columns={columns} data={users} />}
       {/* {!searching &&   <Pagination
                length={total}
                postsPerPage={users.length}
                handlePress={handlePagination}
                currentPage={currentPage}
            />} */}


        </div>
    );
};

export default UserList;