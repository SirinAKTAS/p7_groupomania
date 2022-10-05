import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.action";
import { dateParser, isEmpty } from "../../Utils";
import DeleteCard from "./deleteCard";

const CardAdmin = ({ post }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const usersData = useSelector((state) => state.usersReducer);
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
          <div className="flex gap-6 mr-2">
              <>
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <i className="fa-solid fa-pen-to-square text-primary mr-2 cursor-pointer"></i>
                </div>
                <DeleteCard id={post._id} />
              </>
            
          </div>
        </div>
      </div>
    </li>
  );
};

export default CardAdmin;
