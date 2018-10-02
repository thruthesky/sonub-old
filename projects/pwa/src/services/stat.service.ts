import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface PageView {
    function?: string | number;
    domain?: string;
    from_year: string | number;
    from_month: string | number;
    from_day: string | number;
    to_year: string | number;
    to_month: string | number;
    to_day: string | number;
    data?: any;
}

@Injectable({ providedIn: 'root'})
export class StatService {
    constructor(
        private http: HttpClient
    ) {

    }

    getPageView(req: PageView): Observable<PageView> {
        req['function'] = 'pageView';
        const params = new HttpParams( { fromObject: <any> req } );
        return <any> this.http.get( environment.sonubLogApiServerUrl, { params: params } );
    }
}
