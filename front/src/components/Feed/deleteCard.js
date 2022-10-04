import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.action";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(props.id, props.pictureUrl));
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous vraiment supprimer cet article?")) {
          deleteQuote();
        }
      }}
    >
      <i className="fa-solid fa-trash text-primary cursor-pointer"></i>
    </div>
  );
};

export default DeleteCard;
