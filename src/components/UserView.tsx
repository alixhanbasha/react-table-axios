import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, ChangeEvent, FC, useMemo } from "react";

import IUserData from "../types/IUserData";
import IUserPostData from "../types/IUserPostData";

import PostApiService from "../utils/PostApiService";
import UserApiService from "../utils/UserApiService";

const UserView: FC = () => {

    const location = useLocation();
    const { user } = location.state || {};

    const [currentUser, setCurrentUser] = useState<IUserData>();
    const [posts, setPosts] = useState<Array<IUserPostData>>();

    useEffect(() => {
        getUserByID();
        getPostsOfUser()
    }, []);

    const getPostsOfUser = async () => {
        await PostApiService.getAllPostsOfUser(user.id)
            .then((response: any) => {
                setPosts(response.data.posts)
                console.log("Posts", response.data.posts);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const getUserByID = async () => {
        await UserApiService.get(user.id)
            .then((response: any) => {
                setCurrentUser(response.data)
                console.log("User", response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    return <div>
        <p>{currentUser?.firstName + " " + currentUser?.lastName}</p>
        { posts?.map( e => {
            // design postet
            return (<div>
                <p>{e.title}</p>
                <p>{e.body}</p>
                <div className="row">
                {e.tags.map( tag => {
                    return <div className='col-4'>{tag + " "}</div>
                })}
                 </div>
                </div>)
        } ) }
    </div>
}

export default UserView;
