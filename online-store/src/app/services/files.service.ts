import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import { environment } from './../../environments/environment';

interface File {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private apiUrl = `${environment.API_URL}/api/files`;

  constructor(private http: HttpClient) {}

  getFile(name: string, url: string, type: string) {
    return this.http
      .get(url, {
        responseType: 'blob',
        headers: {
          'Content-Type': type,
        },
      })
      .pipe(
        tap(
          (file) => {
            const blob = new Blob([file], { type });
            saveAs(blob, name);
          },
          map(() => true)
        )
      );
  }

  uploadFile(file: Blob) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<File>(`${this.apiUrl}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
