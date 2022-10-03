import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.action";
import { uidContext } from "../AppContext";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(uidContext);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid))
        setLiked(true);
    }

    const unlike = () => {
        dispatch(unlikePost(post._id, uid))
        setLiked(false);
    }

    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.likers, liked])


    return (
        <div className="flex items-center gap-2">
            {uid && liked === false && (
                <>
                    <i className="fa-solid fa-heart text-tertiary" onClick={like}></i>
                    <span>{post.likers.length}</span>
                </>
            )}

            {uid && liked === true && (
                <>
                    <i className="fa-solid fa-heart text-primary" onClick={unlike}></i>
                    <span>{post.likers.length}</span>
                </>
            )}
           
        </div>
    )
}

export default LikeButton;