import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.action";
import { isEmpty } from "../../Utils";
import Logout from "../Log/logout";
import CardAdmin from "./cardAdmin";

// Affichage si l'admin est connecté
export default function FeedAdmin() {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);

  return (
    <>
      <header className="bg-primary w-full">
        <div className="flex justify-between flex-col items-center p-2 md:flex-row">
          <img
            className="h-16 w-auto object-cover-fit md:h-full md:w-48 rounded-2xl "
            src="../images/logoAvecNom.jpg"
            alt="Logo groupomania"
          />
          <nav>
            <ul className="flex pt-6 gap-16 md:pt-0">
              <Logout />
            </ul>
          </nav>
        </div>
      </header>
      <div className="flex flex-col items-center bg-white m-4 p-2 rounded-xl lg:mx-80">
        <h1 className="font-bold mb-2">Bienvenue {userData.pseudo}</h1>
        <ul className="flex flex-col w-full gap-4">
            {!isEmpty(posts[0]) &&
            posts.map((post) => {
                return <CardAdmin post={post} key={post._id} />
            })}
        </ul>
      </div>
    </>
  );
}
