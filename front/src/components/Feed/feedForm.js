import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../actions/post.action";
import { isEmpty } from "../../Utils";
import Card from "./cardOfFeed";

export default function FeedForm() {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost, dispatch])

    return (
        <div className="border-solid border-2 flex w-full">
            <ul className="border-solid border-2 border-red-400 flex flex-col w-full gap-4">
                {!isEmpty(posts[0]) &&
                posts.map((post) => {
                    return <Card post={post} key={post._id} />;
                })
                }
            </ul>
        </div>
    )
}