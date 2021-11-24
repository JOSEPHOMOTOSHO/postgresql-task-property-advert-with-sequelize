import { Request, Response } from "express";
import client from "../connection";
import {
  createProperty,
  getProperty,
  updateProperty,
  updatePropertyStatus,
  getAllPropertiesByTypeWithUserDetails,
  getAllPropertiesWithUserDetails,
  deleteProperty,
} from "../sqlQueries";

interface Requestextended extends Request {
  User?: {};
  image?: string | {};
  property?: {};
}
interface user {
  id: number;
}
interface property {
  owner: number;
  price: string;
  state: string;
  address: string;
  type: string;
  city: string;
  image_url: string;
  status: string;
}

const createAd = async (
  req: Requestextended,
  res: Response
): Promise<Response | void> => {
  try {

    let { status,price, state, city, address, type } = req.body;
    const image_url = req.image;
    const user = req.User as user;
    const owner = user?.id;
    client.query(
      createProperty,
      [owner, price, state, city, address, type, image_url,status],
      (error, results) => {
        let property = results.rows[0];
       
        if (error) {
          return res.status(400).send({ status: "error", error, data: null });
        }
        return res.status(201).json({
          status: "success",
          data: {
            property,
          },
          error: null,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const updateAd = async (req: Requestextended, res: Response):Promise<Response|void> => {
  try {
    const property_id = parseInt(req.params.id);
    let { price, state, city, address, type, status } = req.body;
    let image_url = req.image;
    let property = req.property as property;

    price = price || property.price;
    state = state || property.state;
    city = city || property.city;
    address = address || property.address;
    type = type || property.type;
    image_url = image_url || property.image_url;
    status = status || property.status;

    client.query(
      updateProperty,
      [price, state, city, address, type, image_url, status, property_id],
      (error, results) => {
        const newProperty = results.rows[0];
        if (error) {
          return res.status(400).json({ status: "error", error, data: null });
        }
        return res.status(200).json({
          status: "success",
          data: {
            property: newProperty,
          },
          error: null,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({ status: "error", error ,data:null});
  }
};



const updateAdtoSold = async (
  req: Requestextended,
  res: Response
): Promise<Response | void> => {
  try {
    const property_id = parseInt(req.params.id);
    let status = "sold";
    client.query(
      updatePropertyStatus,
      [status, property_id],
      (error, results) => {
        const newProperty = results.rows[0];
        if (error) {
          return res.status(400).json({ status: "error", error ,data:null});
        }
        return res.status(200).json({
          status: "success",
          data: {
            property: newProperty,
          },
          error:null
        });
      }
    );
  } catch (error) {
    return res.status(400).json({ status: "error", error ,data:null});
  }
};





const getSingleAd = async (
  req: Requestextended,
  res: Response
): Promise<Response | void> => {
  try {
    const property = req.property
    return res.status(200).json({
        status: "success",
        data: {
          property,
        },
      });
   
  } catch (error) {
    return res.status(400).json({ status: "error", error ,data:null});
  }
};


const getAllAds = async (req: Requestextended, res: Response):Promise<Response|void> => {
  try {
    const propertyType = req.query.type;
    if (propertyType) {
      client.query(
        getAllPropertiesByTypeWithUserDetails,
        [propertyType],
        (error, results) => {
          const noProperty = !results.rows.length;

          if (noProperty) {
            return res.status(400).send("No such Property exists");
          }

          const properties = results.rows;

          if (error) {
            return res.status(400).json({ status: "error", error, data: null });
          }

          return res.status(200).json({
            status: "success",
            data: {
              properties,
            },
            error: null,
          });
        }
      );
      return;
    }

    client.query(getAllPropertiesWithUserDetails, (error, results) => {
      const noProperty = !results.rows.length;
      if (noProperty) {
        return res.status(400).send("No such Property exists");
      }
      const properties = results.rows;
      if (error) {
        return res.status(400).json({ status: "error", error });
      }
      return res.status(200).json({
        status: "success",
        data: {
          properties,
        },
      });
    });
  } catch (error) {
    return res.status(400).json({ status: "error", error ,data:null});
  }
};

const deleteAd = async (req: Requestextended, res: Response):Promise<Response|void> => {
  try {
    const property_id = parseInt(req.params.id);
    client.query(deleteProperty, [property_id], (error) => {
        if (error) {
          return res.status(400).json({ status: "error", error });
        }
        return res.status(200).json({
          status: "success",
          data: {
            message: "Property Ad has been deleted successfully",
          },
        });
      });
  } catch (error) {
    return res.status(400).json({ status: "error", error ,data:null});
  }
};

export { createAd, updateAd, updateAdtoSold, deleteAd, getAllAds, getSingleAd };
