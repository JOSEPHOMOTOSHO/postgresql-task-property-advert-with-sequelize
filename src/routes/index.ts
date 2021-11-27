import {Router} from 'express'
const router = Router()

import {signupUser} from "../controllers/userController"
import SignUpValidator from "../middlewares/SignupValidator"
import SignInValidator from '../middlewares/SignInValidator'
import doesUserExists from '../middlewares/doesUserExists'
import signin from "../controllers/authController"
import {
  createAd,
  updateAd,
  updateAdtoSold,
  getSingleAd,
  getAllAds,
  deleteAd,
} from "../controllers/propertyController";

import isSignedIn from "../middlewares/isSignedIn"
import {imageUpload} from "../middlewares/imageupload"
import isOwner from "../middlewares/isOwner"
import doesPropertyExist from '../middlewares/doesPropertyExist'
import upload from "../middlewares/multer"

router.post('/auth/signup',SignUpValidator,doesUserExists,signupUser)
router.post('/auth/login',SignInValidator,signin)


router.post("/property",isSignedIn,upload.single('image_url'),imageUpload,createAd)
router.get("/property/properties",getAllAds)
router.put("/property/:id",isSignedIn,upload.single('image_url'),imageUpload,doesPropertyExist,isOwner,updateAd)
router.put("/property/:id/sold",isSignedIn,doesPropertyExist,isOwner,updateAdtoSold)
router.get("/property/:id",doesPropertyExist,getSingleAd)
router.delete("/property/:id",isSignedIn,doesPropertyExist,isOwner,deleteAd)



export default router