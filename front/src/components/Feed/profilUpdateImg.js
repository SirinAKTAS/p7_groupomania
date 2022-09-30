import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.action";

export default function UploadImg() {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", userData.pseudo);
        data.append("userId", userData._id);
        data.append("file", file);

        dispatch(uploadPicture(data, userData._id));
    }

    return (
        <form action="" onSubmit={handlePicture} className="flex flex-col justify-center items-center">
            <label htmlFor="file" className="bg-secondary px-6 py-4 rounded-full">Changer d'image</label>
            <br/>
            <input
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={(e) => setFile(e.target.files[0])}
            />
            <br/>
            <input type="submit" value="Envoyer" className="bg-secondary px-6 py-4 rounded-full"/>
        </form>
    )
}