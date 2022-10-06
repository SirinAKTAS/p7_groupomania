const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");

// Affichage des post
exports.readPost = (req, res, next) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

// Création d'un post, possibilité de poster un commentaire avec ou sans images et une image avec ou sans commentaire
exports.createPost = async (req, res, next) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    pictureUrl:
      req.file !== undefined
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : "",
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Modification d'un Post
exports.modifyPost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id }).then((post) => {
    if (req.file) {
      const data = post.pictureUrl.split("images/")[1];
      fs.unlink(`images/${data}`, () => {
        PostModel.findOneAndUpdate(
          { _id: req.params.id },
          {
            ...req.body,
            pictureUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
          }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Publication avec image modifiée !" })
          )
          .catch(() =>
            res.status(400).json({
              error: "Impossible de modifier la piblication avec son image !",
            })
          );
      });
    } else {
      PostModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...req.body,
          message: req.body.message,
        }
      )
        .then(() => res.status(200).json({ message: "Publication modifiée" }))
        .catch(() =>
          res
            .status(400)
            .json({ error: "Impossible de modifier la publication !" })
        );
    }
  });
 
};

// Suppression d'un Post
exports.deletePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
      } else {
        const filename = post.pictureUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          PostModel.findByIdAndRemove({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Post supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// ***************************** SYSTEME DE LIKE / UNLIKE ********************************

// Like un Post
exports.likePost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Retirer son like du Post
exports.unlikePost = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
