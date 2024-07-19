import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {map, Observable} from 'rxjs';

@Injectable()
export class AuthApiService {
    constructor(private httpService: HttpService) {
    }

    validateToken(token: string): Observable<boolean> {
        const url = 'http://auth-service-url/validate'; // replace with your auth service url
        return this.httpService.post(url, {token})
            .pipe(
                map(response => response.data.isValid)
            );
    }
}

