import express from "express";

const validate = (req: express.Request, res: express.Response, next: any) => {
  if (req.body.description && req.body.deadline) {
    //maximum lengh of descrition
    if (req.body.description.length < 25) {
      if (new Date(req.body.deadline) >= new Date()) {
        next();
        //send error if deadline less than today
      } else {
        return res.send({ message: "Deadline must not less than today" });
      }
    }

    //send error if description legth not match criteria
    else {
      return res.send({
        message: "Description length must be less than or equal 25",
      });
    }
  }

  //send error if description or date are empety
  else {
    if (req.method == "POST") {
      return res.send({
        message: "Description and Deadline must not be empty",
      });
    }
    next();
  }
};
export default validate;
