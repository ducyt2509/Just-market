import cloudinary from '#config/cloudinary'

interface UploadResponse {
  url: string
}

interface UploadError {
  status: boolean
  message: string
}

export const UploadCloudinary = {
  upload: async (
    file: { tmpPath: string },
    folder: string = 'test'
  ): Promise<UploadResponse | UploadError> => {
    try {
      const response = await cloudinary.uploader.upload(file.tmpPath, { folder })
      return { url: response.secure_url }
    } catch (error) {
      return { status: false, message: error.message }
    }
  },

  uploadFiles: async (
    files: { tmpPath: string }[],
    folder: string = 'test'
  ): Promise<{ status: boolean; files?: UploadResponse[]; message?: string }> => {
    try {
      const uploadPromises = files.map(async (file) => {
        try {
          const response = await cloudinary.uploader.upload(file.tmpPath, { folder })
          return { url: response.secure_url }
        } catch (error) {
          throw new Error(error.message)
        }
      })
      const uploadResults = await Promise.all(uploadPromises)
      return { status: true, files: uploadResults }
    } catch (error) {
      return { status: false, message: error.message }
    }
  },
}
