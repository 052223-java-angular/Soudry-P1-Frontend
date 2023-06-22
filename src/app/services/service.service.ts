import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from  '@angular/common/http';
import { Observable, map, of, forkJoin } from 'rxjs';
import { Monsterdata } from '../interfaces/monsterdata';
import { environment } from 'src/environments/environments';
import { RegistrationObject } from '../interfaces/registration-object';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  login() {
    return this.http.get(`url`)
  }

  register(body: RegistrationObject) {
    this.http.post(`${this.url}/auth/register`, body).subscribe(
      (response: any) => {
        console.log(response.status);
      }
    )
  }

  getMonsterList(): Observable<[string, string][]> {
    return this.http.get(`${this.url}/monsters/all`).pipe(
      map((value: any) => {
        const monsterList: [string, string][] = [];
        for (let i = 0; i < value.results.length; i++) {
          monsterList[i] = [value.results[i].name, value.results[i].index];
        }
        monsterList.length = 42;
        return monsterList;
      })
    );
  }

  getTeamData(team1: [string, string][], team2: string[]) {
    const yourTeamObservableList: Observable<any>[] = team1.map(
      tupleItem => {
        const key = tupleItem[1]
        return this.http.get(`${this.url}/monsters/singleMonster?name=${key}`, {observe: 'body', responseType: 'json'} );
      })
      const enemyTeamObservableList: Observable<any>[] = team2.map(
        tupleItem => {
          const key = tupleItem
          return this.http.get(`${this.url}/monsters/singleMonster?name=${key}`, {observe: 'body', responseType: 'json'} );
        })
        const fusedLists = [...yourTeamObservableList, ...enemyTeamObservableList];
        return forkJoin(fusedLists);
  }

  getItemList() {
    const headers = {
      "auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZSIsImlkIjoiMjQzYWJmOGQtYWYwMS00M2FhLWEwMzctZTIyMDRlMTA3ZjU0IiwiZXhwIjoxNjg3MDc1OTgzLCJpYXQiOjE2ODcwMzk5ODN9.FCkPwN7bmxfNMMeA_1Ahvx5NF1nTej3ClavetZXYiLM"
    };
    return this.http.get(`${this.url}/items/all`, { headers: headers });
  }
}
