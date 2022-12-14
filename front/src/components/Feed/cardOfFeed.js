import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.action";
import { dateParser, isEmpty } from "../../Utils";
import DeleteCard from "./deleteCard";
import LikeButton from "./likeButton";

/**
 * Affichage des données des post depuis le store
 * Affichage d'icones selon l'utilisateur connecter
 * Affichage des données de tout les utilisateurs, également de la personne connecté
 */
  const Card = ({ post }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(post.message);
  //const [file, setFile] = useState(post.pictureUrl);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = async () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  return (
    <li
      className="border-solid border-2 border-secondary rounded-lg flex gap-2"
      key={post._id}
    >
      <img
        className="h-16 w-16 ml-2 mt-2 rounded-full"
        src={
          !isEmpty(usersData[0]) &&
          usersData
            .map((user) => {
              if (user._id === post.posterId) return user.picture;
              else return null;
            })
            .join("")
        }
        alt="poster-pic"
      />
      <div className="w-full">
        <h3 className="font-bold">
          {!isEmpty(usersData[0]) &&
            usersData.map((user) => {
              if (user._id === post.posterId) return user.pseudo;
              else return null;
            })}
        </h3>
        <p className="text-xs italic pb-2 text-gray-500">
          le {dateParser(post.createdAt)}
        </p>
        {isUpdated === false && <p className="py-4">{post.message}</p>}
        {isUpdated === true && (
          <>
            <textarea
              className="w-full italic bg-tertiary/25 p-2 rounded-xl border-solid border-2 border-primary"
              defaultValue={post.message}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
   {
     //       <div className="flex flex-col w-full gap-4 p-2">
     //         input
     //           className="file:bg-secondary file:rounded-xl file:border-none"
     //           type="file"
     //           id="file-upload"
     //           name="file"
     //           accept=".jpg, .jpeg, .png, .gif, .webp"
     //           onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
     //         />
     //       </div>
    }          
            <div>
              <button
                className="bg-secondary px-2 py-1 rounded-xl"
                onClick={updateItem}
              >
                Valider modification
              </button>
            </div>
          </>
        )}
        {post.pictureUrl && (
          <img
            className="pr-4 py-4 md:h-80"
            src={post.pictureUrl}
            alt="card-pic"
          />
        )}

        <div className="flex justify-between gap-4 mt-2">
          <LikeButton post={post} />
          <div className="flex gap-6 mr-2">
            {userData._id === post.posterId && (
              <>
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <i className="fa-solid fa-pen-to-square text-primary mr-2 cursor-pointer"></i>
                </div>
                <DeleteCard id={post._id} />
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
