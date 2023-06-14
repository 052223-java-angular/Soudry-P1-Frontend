import { Component } from '@angular/core';
import { firstValueFrom} from 'rxjs';
import { Monsterdata } from 'src/app/interfaces/monsterdata';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent {
  constructor(private service: ServiceService) {}
  
  yourTeam: [string, string][] = [];
  defaultEnemy: string[] = ["death-dog","giant-hyena", "glabrezu"];

  ngOnInit() {
    const token : string | null = sessionStorage.getItem("yourTeam");
    if (token) {
      let tokenArray: string[] = token.split(",");
      let c = 0;
      for(let i = 0; i < 3; i++) {
        if (c != 0) {
          c++;
        }
        this.yourTeam[i] = [tokenArray[c], tokenArray[c+1]]
        c++;
      }
    }
    this.grabMonsterDataByName(this.yourTeam, this.defaultEnemy);
  }

  async grabMonsterDataByName(team1: [string, string][], team2: string[]) {
    this.service.getTeamData(team1, team2).subscribe((value : any) => {
      console.log(value);
    })
  }
}