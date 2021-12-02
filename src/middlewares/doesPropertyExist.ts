// import client from "../connection[not used]";
// import { getProperty } from "../sqlQueries[not used]";
import { NextFunction, Request, Response } from "express";
import { Properties } from "../../models/properties";

interface Requestextended extends Request {
  User?: {};
  image?: string | {};
  property?: {};
}
interface user {
  id: number;
}

const doesPropertyExist = async (
  req: Requestextended,
  res: Response,
  next: NextFunction
): Promise<Response | void | undefined> => {
  const property_id = parseInt(req.params.id);
  const property = await Properties.findOne({
    where: {
      id: property_id,
    },
  });
  if (!property) {
    return res.status(400).send({errorMessage:"No such Property exists"});
  }
  const Userproperty = property;
  req.property = Userproperty;
  next();
};

export default doesPropertyExist;
