import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { blob } from 'stream/consumers';
import { map, Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  http = inject(HttpClient)
  sanitizer = inject(DomSanitizer)

  constructor() { }
  
  getImage(type: 'product' | 'user' | 'category', imageName: string): Observable<SafeUrl> {
    return this.http.get(
      `${environment.baseUrl}file/${type}/${imageName}`, 
      {responseType: 'blob'}
    ).pipe(
      map(blob => {
        const objectUrl = URL.createObjectURL(blob)
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl)
    }))
  }  
}
