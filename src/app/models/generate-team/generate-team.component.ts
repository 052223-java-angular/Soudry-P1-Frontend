import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-team',
  templateUrl: './generate-team.component.html',
  styleUrls: ['./generate-team.component.css']
})
export class GenerateTeamComponent {

  ready = false 

  monsterList: [string, string, string, boolean][] = []

  enemyOptions: [string, string, string][] = []

  nestedTuple: [string, string, 
    string, string, 
    string, string,
  ][] = [];

  filteredItems: [string, string, string, boolean][] = [];

  test: string = "";

  yourTeam: [string, string, string, ][] = [];

  enemyTeam: any[] = [];

  safety: boolean = false;

  searchQuery: string = '';

  constructor(private service: ServiceService, private router: Router) {

  }

  ngOnInit() {
    let key : any = sessionStorage.getItem("key");
    this.getDataFromApi(key);
  }

  async getDataFromApi(key : any) {
    this.service.getMonsterList(key).subscribe((monsterList: [[string, string, string][], [string, string, string][]]) => {
      // this.monsterList = monsterList[0];
      let storage : [string, string, string] [] = monsterList[0];
      // // this.filteredItems = monsterList[0]
      // this.filteredItems = monsterList.map((item: [string, string, string]) => {
      //   return [...item, false] as [string, string, string, boolean];
      // });
      this.filteredItems = storage.map((item: [string, string, string]) => {
        return [...item, false] as [string, string, string, boolean];
      });
      this.monsterList = this.filteredItems
      
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

  record(value2: [string, string, string, boolean]) {
    const length: number = this.yourTeam.length;
    const originalValue: [string, string, string] = [value2[0], value2[1], value2[2]]; // Store the original value array
  
    console.log(originalValue);
  
    if (this.yourTeam.some((item) => item[0] === originalValue[0] && item[1] === originalValue[1] && item[2] === originalValue[2])) {
      // Check if the originalValue is already present in yourTeam array
      this.yourTeam.splice(this.yourTeam.findIndex((item) => item[0] === originalValue[0] && item[1] === originalValue[1] && item[2] === originalValue[2]), 1);
      console.log(this.yourTeam);
      value2[3] = !value2[3];
      console.log(value2);
    } else if (length < 3) {
      this.yourTeam[length] = originalValue;
      console.log(this.yourTeam);
      value2[3] = !value2[3];
      console.log(value2);
    } else {
      this.safety = true;
    }
    // if (this.yourTeam.length < 1) {
    //   this.ready = false;
    // }
  }
  

  // record(value2: [string, string, string, boolean]) {
  //   const length : number = this.yourTeam.length
  //   let value : [string, string, string] = ["", "", ""]
  //   value[0] = value2[0] 
  //   value[1] = value2[1] 
  //   value[2] = value2[2] 
  //   console.log(value);
  //   if(this.yourTeam.includes(value)) {
  //     this.yourTeam.splice(this.yourTeam.indexOf(value))
  //     console.log(this.yourTeam)

  //   } else if (length < 3) {
  //     this.yourTeam[length] = value
  //     console.log(this.yourTeam);
  //     value2[3] = !value2[3]
  //     console.log(value2);
  //   } 
  //   else {
  //     this.safety = true;
  //   }   
  // }
  // removeMonster(value : [string, string, string]) {


  //   let val : [string, string, string, boolean] = [value[0], value[1], value[2], true];
  //   this.record(val);
  //   this.filteredItems.findIndex(val);
  //   // let valueToBeRemoved : number = this.yourTeam.indexOf(value);
  //   // this.yourTeam.splice(valueToBeRemoved, 1);
  //   // if (this.safety == true) {
  //   //   this.safety = false;
  //   // }
  // }

  updateFilteredItems() {
    this.filteredItems = this.monsterList.filter(monster =>
      monster[0].toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

 

  commitEnemyTeam(value : any) {
    sessionStorage.setItem("enemyTeam", JSON.stringify(value))
    this.router.navigate((['/main']))
    // this.checkIfReady();
  }

  // checkIfReady() {
  //   if (this.yourTeam.length > 1) {
  //     this.ready = true;
  //   }
  // }

  matchmaking() {
   let value : number = Math.floor(Math.random() * 2);
    this.commitEnemyTeam(this.enemyTeam[value])
    this.router.navigate((['/main']))
  }

  ngOnDestroy() {
    sessionStorage.setItem("yourTeam", JSON.stringify(this.yourTeam))
  }
}
