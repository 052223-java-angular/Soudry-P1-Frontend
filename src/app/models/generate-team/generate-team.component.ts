import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-team',
  templateUrl: './generate-team.component.html',
  styleUrls: ['./generate-team.component.css']
})
export class GenerateTeamComponent {

  monsterList: [string, string][] = []

  filteredItems: [string, string][] = [];

  test: string = "";

  yourTeam: [string, string][] = [];

  safety: boolean = false;

  searchQuery: string = '';

  constructor(private service: ServiceService) {

  }

  ngOnInit() {
    this.getDataFromApi();
  }

  async getDataFromApi() {
    this.service.getMonsterList().subscribe((monsterList: [string, string][]) => {
      this.monsterList = monsterList;
      this.filteredItems = monsterList
    });
  }

  record(value: [string, string]) {
    const length : number = this.yourTeam.length
    if (length < 3) {
      this.yourTeam[length] = value
    } else {
      this.safety = true;
    }   
  }
  removeMonster(value : [string, string]) {
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

  ngOnDestroy() {
    sessionStorage.setItem("yourTeam", this.yourTeam.toString())
  }
}
