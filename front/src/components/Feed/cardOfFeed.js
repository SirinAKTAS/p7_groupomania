import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../../Utils";

const Card = ({ post }) => {
    const usersData = useSelector((state) => state.usersReducer);
    // const userData = useSelector((state) => state.userReducer);

    useEffect(() => {

    })

    return (
        <li className="border-solid border-2 border-purple-400 flex gap-2" key={post._id}>
            <img className="h-16 w-16 rounded-full" src={
                !isEmpty(usersData[0]) &&
                usersData.map((user) => {
                    if (user._id === post.posterId) return user.picture;
                }).join('')
            } alt="poster-pic" />
            <div className="">
                <h3 className="font-bold">
                    {
                        !isEmpty(usersData[0]) &&
                        usersData.map((user) => {
                            if (user._id === post.posterId) return user.pseudo;
                        })
                    }
                </h3>
                <p className="text-xs italic text-gray-500">le {dateParser(post.createdAt)}</p>
                <p className="py-4">{post.message}</p>
                { post.picture && (
                    <img src={post.pictureUrl} alt="card-pic" />
                )}
            
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-comment text-tertiary"></i>
                        <span>{post.comments.length}</span>
                    </div>
                
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-heart text-tertiary"></i>
                        <span>{post.likers.length}</span>
                    </div>
                </div>

            </div>
           
        </li>
    );
};

export default Card;