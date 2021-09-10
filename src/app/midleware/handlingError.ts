//midleware for handling error if req.body empty during post/delete/patch
import express from "express";

const checkIfEmptyBody = (req: any, res: express.Response, next: any) => {
  if (req.body.constructor == Object && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Request body can not be empty!",
    });
  }
  next();
};

export default checkIfEmptyBody;
