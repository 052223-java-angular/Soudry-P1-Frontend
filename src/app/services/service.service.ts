import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Observable, map, of, forkJoin } from 'rxjs';
import { Monsterdata } from '../interfaces/monsterdata';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = "http://localhost:8080/ddwar/api"

  constructor(private http: HttpClient) { }

  login() {
    return this.http.get(`url`)
  }

  register() {
    return this.http.get(`url`)
  }

  getMonsterList(): Observable<[string, string][]> {
    return this.http.get(`${this.url}/monsters/all`).pipe(
      map((value: any) => {
        const monsterList: [string, string][] = [];
        for (let i = 0; i < value.results.length; i++) {
          monsterList[i] = [value.results[i].name, value.results[i].index];
        }
        monsterList.length = 18;
        return monsterList;
      })
    );
  }

  getTeamData(team1: [string, string][], team2: string[]) {
      let team: Monsterdata[] = [];
      const requests2 = team2.map(element => {
        return this.http.get(`${this.url}/monsters/singleMonster?name=${element}`);
      });
      const requests = team1.map(element => {
        return this.http.get(`${this.url}/monsters/singleMonster?name=${element[1]}`);
      });
      forkJoin([...requests, ...requests2]).subscribe(
          (values: any[]) => {
            values.forEach(value => {
              let length = team.length;
              team[length] = value;
            });
          }
      );
      return of(team);
  }

  getSingleTeamData(team: string[]) {

  }

  
  
  
  
  
  
  
  // getItembyName() {
  // return this.http.get(`https://www.dnd5eapi.co/api/monsters/adult-black-dragon/`)
  // }
}
