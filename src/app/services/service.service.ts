import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from  '@angular/common/http';
import { Observable, map, of, forkJoin } from 'rxjs';
import { Monsterdata } from '../interfaces/monsterdata';
import { environment } from 'src/environments/environments';
import { RegistrationObject } from '../interfaces/registration-object';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = environment.backendUrl;
  private url2 = environment.backendUrl2;

  constructor(private http: HttpClient) { }



  login(body: Login) {
    return this.http.post(`${this.url}auth/login`, body);
    
 
  }
  

  register(body: RegistrationObject) {
   return this.http.post(`${this.url}auth/register`, body);
    // .subscribe(
    //   (response: any) => {
    //     console.log(response.status);
    //   }
    // )
  }

  getMonsterList(key : any): Observable<[[string, string, string][], [string, string, string][]]> {
  // getMonsterList(key : any): Observable<[string, string, string][]> {
    const headers = {
      "auth-token": key
    };
    return this.http.get(`${this.url}monsters/all`, {headers: headers}).pipe(
      map((value: any) => {
        const monsterList: [string, string, string][] = [];
        for (let i = 0; i < value.results.length; i++) {
          monsterList[i] = [value.results[i].name, value.results[i].index,  value.results[i].monsterType];
        }
        // monsterList.length = 42;


        const firstArray: [string, string, string][] = monsterList.slice(0, 41);
        // Create an array of the next 42 elements
        const secondArray: [string, string, string][] = monsterList.slice(42, 51);

        return [firstArray, secondArray];
        // return monsterList;
      })
    );
  }

  getTeamData(team1: [string, string, string][], team2: string[], jwt: string) {

    const headers = {
      "auth-token": jwt
    };

    const yourTeamObservableList: Observable<any>[] = team1.map(
      tupleItem => {

        const key = tupleItem[1]

        return this.http.get(`${this.url}monsters/singleMonster?name=${key}`, {observe: 'body', responseType: 'json', headers: headers} );
      })
      const enemyTeamObservableList: Observable<any>[] = team2.map(
        tupleItem => {
          const key = tupleItem
          return this.http.get(`${this.url}monsters/singleMonster?name=${key}`, {observe: 'body', responseType: 'json', headers: headers} );
        })
        const fusedLists = [...yourTeamObservableList, ...enemyTeamObservableList];
        return forkJoin(fusedLists);
  }

  getItemList(token : string) {
    const headers = {
      "auth-token": token
    };
    return this.http.get(`${this.url}items/all`, { headers: headers });
  }
}
