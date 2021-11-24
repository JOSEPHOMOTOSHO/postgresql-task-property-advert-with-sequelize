import { NextFunction, Request, response, Response } from "express";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_COMPANY,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

interface Requestextended extends Request{
    User?:{}
    image?: string | {}
}
const imageUpload = async (req: Requestextended, res: Response, next: NextFunction) => {
  const img_url = await cloudinary.uploader
    .upload(req.file?.path || req.body.image_url)
    .catch((err: any) => {
      return null;
    });
  const image_url = req.body.image_url || img_url?.secure_url;
  req.image = image_url
  next();
};

export { cloudinary, imageUpload };
