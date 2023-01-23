import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { ImageService } from 'src/app/services/api/image/image.service';
import { CACHE_IMG_FOLDER } from 'src/environments/environment';

@Component({
  selector: 'img-cache',
  templateUrl: './cached-image.component.html',
  styleUrls: ['./cached-image.component.scss']
})
export class CachedImageComponent implements OnInit{
  @Input() spinner: boolean = false;
  @Input() src: string | undefined
  @Input() fitting:"cover" | "contain"  = "contain";
  @Input() lazyLoading: boolean = true;
  _src:any;
  constructor(
    private imgService: ImageService,
    private sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {
    this._src = this.src;
    // this.src && this.imgService.getImageByURL(this.src).then(res => {
    //   let safeURL = this.sanitizer.bypassSecurityTrustUrl(
    //     URL.createObjectURL(res)
    //   );

    //   this._src = this.getSafeImageUrl(safeURL);
    //   // this._src = URL.createObjectURL(res);
    // }).catch(e => {
    //   console.warn(e,'error get image');
    // })
  }

  async storeImage(url: string, path: string) {
    const response = await fetch(url);
    const blob = await response.blob();

    const base64data = await this.convertBlobToBase64(blob) as string;
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Cache,
      path: `${CACHE_IMG_FOLDER}/${path}`,
      data: base64data
    }).then(file => console.log(file)).catch(e => console.error(e));
    return savedFile;
  }

  convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.readAsDataURL(blob);
    })
  }

  getSafeImageUrl(url: any) {
    return url.changingThisBreaksApplicationSecurity;
  }
}
