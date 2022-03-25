import Joi from "joi";
import { errorFormatter, Logger } from "../util";
import Image from "../util/Image";
const urlSchema = Joi.object({
  url: Joi.string().uri().required(),
});
class Thumbnail {
  static async resize(request, response) {
    try {
      const { url } = await urlSchema.validateAsync(request.query);
      console.log(url);
      const downloadedImageUrl = await Image.download(url);
      response.set("Content-Type", "image/png");
      const fileUrl = await Image.resize(downloadedImageUrl, 50, 50);
      response.status(200).sendFile(fileUrl);
    } catch (error) {
      const { status, message, error: err } = errorFormatter(error);
      if (status === 500) Logger.error(err);
      else Logger.error(err);
      return response.status(status).json({ message });
    }
  }
}
export default Thumbnail;
