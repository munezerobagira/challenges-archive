import sharp from "sharp";
import axios from "axios";
import {
  createWriteStream,
  createReadStream,
  unlink,
  existsSync,
  mkdirSync,
} from "fs";
import { join, basename } from "path";
class Image {
  /**
   *
   * @param {string} url public url of the image
   * @returns {Promise<string: localPathUrl >}
   */
  static async download(url) {
    return new Promise(async (resolve, reject) => {
      try {
        let mainFolder = join(__dirname, "../../public/images/temp");
        if (!existsSync(mainFolder)) {
          mkdirSync(mainFolder, { recursive: true });
        }
        let file = join(
          __dirname,
          `../../public/images/temp/${Date.now() + basename(url).split("?")[0]}`
        );
        const temporaryImage = createWriteStream(file);
        const response = await axios.get(url, { responseType: "stream" });
        if ((response.status = 200)) {
          const write = response.data.pipe(temporaryImage);
          write.on("finish", () => {
            resolve(file);
          });
        } else {
          reject(new Error("Image download failed"));
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   *
   * @param {*} url
   * @returns {Promise<null>}
   */
  static async delete(url) {
    return new Promise(async (resolve, reject) => {
      try {
        unlink(url, (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   *
   * @param {string} fileUrl - local path of the image
   * @param {number} width - width of the image after resizing
   * @param {number} height - height of the image after rezing
   * @returns {string} fileUrl - path to resized image
   */
  static resize(fileUrl, width, height, deleteInput = true) {
    return new Promise(async (resolve, reject) => {
      try {
        const fileStream = createReadStream(fileUrl);
        const output = fileUrl.replace(
          basename(fileUrl),
          "resized-" + basename(fileUrl)
        );
        const writeStream = createWriteStream(output);
        const transform = await sharp().resize(width, height);
        const pipeline = fileStream
          .pipe(transform)
          .on("error", (error) => {
            reject(error);
          })
          .pipe(writeStream);

        pipeline.on("finish", () => {
          if (deleteInput) {
            this.delete(fileUrl);
          }
          resolve(output);
        });
        pipeline.on("error", (err) => {
          reject(err);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
export default Image;
