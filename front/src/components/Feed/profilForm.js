import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.action";
import { dateParser } from "../../Utils";

export default function ProfilForm() {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
    }

    return (
        <div className="flex justify-center items-center flex-col w-full">
            <h3 className="text-xl font-bold text-tertiary">Profil de {userData.pseudo}</h3>
            <p className="text-xs">Membre depuis le : {dateParser(userData.createdAt)}</p>
            <img src={userData.picture} alt="user-pic"  className="p-4 rounded-full object-cover-fit h-44 w-44"/>
            <div className="flex flex-col justify-center items-center py-4">
                <h3 className="font-bold text-tertiary">Bio</h3>
                {updateForm === false && (
                    <>
                        <p className="border-solid border-2 border-secondary h-20 w-60 p-2 rounded-xl" onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                        <button className="mt-4 bg-secondary px-6 py-4 rounded-full" onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                    </>
                )}
                {updateForm && (
                    <>
                        <textarea className="bg-tertiary/25 text-black border-solid border-2 border-primary h-20 w-60 p-2 rounded-xl" type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                        <button className="mt-4 bg-secondary px-6 py-4 rounded-full" onClick={handleUpdate}>Valider la modification</button>
                    </>
                )}
            </div>
        </div>
    )
}