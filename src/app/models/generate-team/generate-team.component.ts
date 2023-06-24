import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-team',
  templateUrl: './generate-team.component.html',
  styleUrls: ['./generate-team.component.css']
})
export class GenerateTeamComponent {

  monsterList: [string, string, string][] = []

  enemyOptions: [string, string, string][] = []

  nestedTuple: [string, string, 
    string, string, 
    string, string,
  ][] = [];

  filteredItems: [string, string, string][] = [];

  test: string = "";

  yourTeam: [string, string, string][] = [];

  enemyTeam: any[] = [];

  safety: boolean = false;

  searchQuery: string = '';

  constructor(private service: ServiceService) {

  }

  ngOnInit() {
    let key : any = sessionStorage.getItem("key");
    this.getDataFromApi(key);
  }

  async getDataFromApi(key : any) {
    this.service.getMonsterList(key).subscribe((monsterList: [[string, string, string][], [string, string, string][]]) => {
      this.monsterList = monsterList[0];
      this.filteredItems = monsterList[0]
      this.enemyOptions = monsterList[1];
      this.generateEnemyTeam(this.enemyOptions);
      console.log(this.enemyOptions);
    });
  }

  async generateEnemyTeam(team: [string, string, string][]) {
    for (let i = 0; i < 9;) {
  
        let v = i + 1;
        let b = v + 1;
  
      this.enemyTeam.push([[team[i][0], team[i][1]], [team[v][0], team[v][1]], [team[b][0], team[b][1]]])
      i = i + 3;
    }
   console.log(this.enemyTeam);

  }

  record(value: [string, string, string]) {
    const length : number = this.yourTeam.length
    if (length < 3) {
      this.yourTeam[length] = value
      console.log(this.yourTeam);
    } else {
      this.safety = true;
    }   
  }
  removeMonster(value : [string, string, string]) {
    let valueToBeRemoved : number = this.yourTeam.indexOf(value);
    this.yourTeam.splice(valueToBeRemoved, 1);
    if (this.safety == true) {
      this.safety = false;
    }
  }

  updateFilteredItems() {
    this.filteredItems = this.monsterList.filter(monster =>
      monster[0].toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  generateRandomTeams() {
  console.log("Hello");
  }

  commitEnemyTeam(value : any) {
    sessionStorage.setItem("enemyTeam", JSON.stringify(value))

  }

  ngOnDestroy() {
    sessionStorage.setItem("yourTeam", JSON.stringify(this.yourTeam))
  }
}
