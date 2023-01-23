import { Injectable } from "@angular/core";
import { BlobImage } from "./image.model";
import { readImagesByURL, createImage } from "./image.db";
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  constructor(
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) { }

  /**
   * This method attemps to load the image array
   * from the database, and if it is not found,
   * it encodes the image, saves it and returns the
   * encode {@link BlobImage }
   *
   * This way it should be available in the database on future
   * requests.
   *
   * @param url The image URL
   */
  async getCSSBackgroundImageURL(url: string) {
    let images: BlobImage[] = await readImagesByURL(url);
    if (images.length == 0) {
      return `url('${url}')`;
    }

    const safeURL: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(images[0].data)
    );

    return this.getSafeBackgroundImageUrl(safeURL);
  }

  /**
   * @param url The SafeUrl instance
   */
  private getSafeBackgroundImageUrl(url: any) {
    return `url("${url.changingThisBreaksApplicationSecurity}")`;
  }

  fetchImage(URL:any | undefined): Observable<Blob | undefined> {
    return this.httpClient.get(URL, {
      responseType: "blob",
    });
  }

  /**
   * Save the blob image to the database.
   * It first checks whether there exists an
   * image with the URL in the database.
   *
   * @param url The URL of the image
   * @param blob The blob
   */
  async saveImageToDatabase(url: string, blob: Blob) {
    if ((await readImagesByURL(url)).length == 0) {
      const blobImage = new BlobImage(url, blob, blob.type);
      createImage(blobImage);
    }
  }
  // getImageByURLSanitized(image:any){
  //   return this.getImageByURL(image).then(res=>{
  //     console.log('aawqq',res)
  //     let safeURL = this.sanitizer.bypassSecurityTrustUrl(
  //       URL.createObjectURL(res)
  //     );
  //     return this.getSafeImageUrl(safeURL);
  //   })
  // }
  getSafeImageUrl(safeUrl:any){
    return safeUrl.changingThisBreaksApplicationSecurity;

  }
  async getImageByURL(url: any=''): Promise<Blob | undefined> {
    let image_availability = await readImagesByURL(url).then().catch(e=>{
      console.log(e,'error get image')
      return e
    });
    if (image_availability?.length == 0) {
      let urlFormatted = this.formatUrlSubdomain(url);
      return this.fetchImage(urlFormatted).toPromise().then(res=>{
        console.log(res)
        this.saveImageToDatabase(url, url);
        return res
      }).
      catch(e=>{
        console.log(e,"error get hhtp image");
        throw Error("error get hhtp image");
      })
    }else{
      // console.log("FROM CACHE",url);
      return image_availability[0].data;
    }
  }

  formatUrlSubdomain(src:any | undefined) {
    let res = src;
    if (src.includes("https://s3")) {
      let path = src.split("/");
      let path_to_subdomain = path.splice(3, 1)
      path = path.join("/").split("//");
      res = `https://${path_to_subdomain}.${path[1]}`;
    }
    return res
  }
}
