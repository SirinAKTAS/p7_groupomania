import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../actions/post.action";

export default function NewFormPost() {
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handlePost = async () => {
        if (message || postPicture) {
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);
            if (file) data.append('image', file);

            await dispatch(addPost(data));
            dispatch(getPosts())
            cancelPost()
        } else {
            alert('Veuillez remplir le post avec un message et/ou une image')
        }
    }

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const cancelPost = () => {
        setMessage('');
        setPostPicture('');
        setFile('');
    }

    return (
        <>
        <div className="flex flex-col justify-center items-center gap-1 w-full">
            <img src={userData.picture} alt="user-pic" className="h-24 w-24 mb-2 rounded-full" />
            <textarea 
            name="message"
            id="message"
            placeholder={"Quoi de neuf " + userData.pseudo + " ?"}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="w-full border-solid border-2 border-secondary rounded-lg placeholder:italic"
            />
            { postPicture ? (
                <div>
                    <img src={postPicture} alt="post-pic"/>
                </div>
            ) : null}
        </div>
        <div className="flex flex-row w-full justify-end items-center gap-4 p-2">
            <input
            className="file:bg-secondary file:rounded-xl file:border-none"
            type="file"
            id="file-upload"
            name="image"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={(e) => handlePicture(e)}
            />
            <button className="bg-secondary px-2 py-1 rounded-xl" onClick={handlePost}>Envoyer</button>
        </div>
        </>
    )
}