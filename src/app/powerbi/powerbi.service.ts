import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PowerBiService {
  constructor(public http: HttpClient) {
  }
  getReportEmbedToken(workspaceid: string, reportid: string, email: string): Observable<any> {
    const apiUrl = 'http://localhost:5000' + `/powerbi/${workspaceid}/${reportid}?email=${email}`;
    return this.http.get(apiUrl).pipe();
  }
}
