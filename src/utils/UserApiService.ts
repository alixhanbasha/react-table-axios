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
const getUsersPerPage = (page: number, limit: number) => {
    return http.get<Array<IUserData>>(`/users?limit=${limit}&skip=${(page - 1) * limit}`);
}

const UserApiService = {
    getAll,
    get,
    findByName,
    getUsersPerPage,
    filterUser
};

export default UserApiService;