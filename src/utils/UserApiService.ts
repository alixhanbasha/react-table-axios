import http from "../http-common";
import IUserData from "../types/IUserData";

const getAll = () => {
    return http.get<Array<IUserData>>("/users");
};

const get = (id: any) => {
    return http.get<IUserData>(`/users/${id}`);
};


const findByName = (name: string) => {
    return http.get<Array<IUserData>>(`/users/search?q=${name}`);
};

const filterUser = (key: string, value: string) => {
    return http.get<Array<IUserData>>(`users/filter?key=${key}&value=${value}`);
};

// for pagination
const get25Users = (page: number) => {
    return http.get<Array<IUserData>>(`/users?limit=25&skip=${page}`);
}

const UserApiService = {
    getAll,
    get,
    findByName,
    get25Users,
    filterUser
};

export default UserApiService;