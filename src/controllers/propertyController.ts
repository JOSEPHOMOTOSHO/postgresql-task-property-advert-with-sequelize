import { Request, Response } from "express";
import { Properties } from "../../models/properties";
// import {
//   createProperty,
//   updateProperty,
//   updatePropertyStatus,
//   getAllPropertiesByTypeWithUserDetails,
//   getAllPropertiesWithUserDetails,
//   deleteProperty,
// } from "../sqlQueries[not used]";

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
    let { status, price, state, city, address, type } = req.body;
    const image_url = req.image;
    const user = req.User as user;
    const owner = user?.id;

    const property = Properties.create({
      owner,
      status,
      price,
      state,
      city,
      address,
      type,
      image_url,
    })
      .then((data: any) => {
        return res.status(201).json({
          status: "success",
          data,
          error: null,
        });
      })
      .catch((err: any) => {
        return res.status(400).json({
          status: "error",
          data: null,
          error: err,
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "error",
      data: null,
      error: err,
    });
  }
};

const updateAd = async (
  req: Requestextended,
  res: Response
): Promise<Response | void> => {
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

    const Updatedproperty = await Properties.update(
      {
        price,
        state,
        city,
        address,
        type,
        image_url,
        status,
      },
      {
        where: {
          id: property_id,
        },
        returning: true,
        plain: true,
      }
    );
    return res.status(200).json({
      status: "success",
      data: {
        property: Updatedproperty[1],
      },
      error: null,
    });
  } catch (error) {
    return res.status(400).json({ status: "error", error, data: null });
  }
};

const updateAdtoSold = async (
  req: Requestextended,
  res: Response
): Promise<Response | void> => {
  try {
    const property_id = parseInt(req.params.id);
    let status = "sold";
    const Updatedproperty = await Properties.update(
      {
        status,
      },
      {
        where: {
          id: property_id,
        },
        returning: true,
        plain: true,
      }
    );
    return res.status(200).json({
      status: "success",
      data: {
        property: Updatedproperty[1],
      },
      error: null,
    });
  } catch (error) {
    return res.status(400).json({ status: "error", error, data: null });
  }
};

const getSingleAd = async (
  req: Requestextended,
  res: Response
): Promise<Response | void> => {
  try {
    const property = req.property;
  
    return res.status(200).json({
      status: "success",
      data: {
        property,
      },
    });
  } catch (error) {
    return res.status(400).json({ status: "error", error, data: null });
  }
};

const getAllAds = async (
  req: Requestextended,
  res: Response
): Promise<Response | void> => {
  try {
    const propertyType = req.query.type;
    if (propertyType) {
      let properties = await Properties.findAll({
        where: {
          type: propertyType,
        },
      });
      if (!properties.length) {
        return res.status(400).send("No such Property exists");
      }
      return res.status(200).json({
        status: "success",
        data: {
          properties,
        },
        error: null,
      });
    }

    const properties = await Properties.findAll({});
    return res.status(200).json({
      status: "success",
      data: {
        properties,
      },
    });
  } catch (error) {
    return res.status(400).json({ status: "error", error, data: null });
  }
};

const deleteAd = async (
  req: Requestextended,
  res: Response
): Promise<Response | void> => {
  try {
    const property_id = parseInt(req.params.id);
    const deleteProperty = Properties.destroy({
      where: {
        id: property_id,
      },
    });

    return res.status(200).json({
      status: "success",
      data: {
        message: "Property Ad has been deleted successfully",
      },
    });
  } catch (error) {
    return res.status(400).json({ status: "error", error, data: null });
  }
};

export { createAd, updateAd, updateAdtoSold, getSingleAd, getAllAds, deleteAd };
