import client from "../connection";
import { getProperty } from "../sqlQueries";
import { NextFunction, Request, Response } from "express";

interface Requestextended extends Request {
  User?: {};
  image?: string | {};
  property?: {};
}
interface user {
  id: number;
}

const doesPropertyExist = (
  req: Requestextended,
  res: Response,
  next: NextFunction
) => {
  const property_id = parseInt(req.params.id);
  client.query(
    getProperty,
    [property_id],
    (error, results): Response | void => {
      if (error) {
        return res.status(400).json({ status: "error", error, data: null });
      }
      const noProperty = !results.rows.length;

      if (noProperty) {
        return res.status(400).send("No such Property exists");
      }

      const property = results.rows[0];
      req.property = property;

      next();
    }
  );
};

export default doesPropertyExist;
