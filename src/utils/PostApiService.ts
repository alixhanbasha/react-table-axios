import http from "../http-common";
import IUserPostData from "../types/IUserPostData";

const getAll = () => {
    return http.get<Array<IUserPostData>>("/posts");
};

const get = (id: any) => {
    return http.get<IUserPostData>(`/posts/${id}`);
};

const getAllPostsOfUser = (userid: any) => {
    return http.get<Array<IUserPostData>>(`/posts/user/${userid}`);
}

const PostApiService = {
    getAll,
    get,
    getAllPostsOfUser
};

export default PostApiService;