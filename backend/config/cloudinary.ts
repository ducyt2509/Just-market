// config/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dyatlk8t7',
  api_key: process.env.CLOUDINARY_API_KEY || '477164734338116',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'YQ2nD8A1Ejhe9TBExSYhMyV47fQ',
})

export default cloudinary
