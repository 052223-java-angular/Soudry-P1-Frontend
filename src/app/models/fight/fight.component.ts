import { Component } from '@angular/core';
import { Monsterdata } from 'src/app/interfaces/monsterdata';
import { Item } from 'src/app/interfaces/item';
import { ItemList } from 'src/app/interfaces/item-list';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent {

  constructor(private service: ServiceService, private router: Router) {}
  // item: ItemList = [];
  battleStatus: string = "preCombat";
  yourTeam: [string, string][] = [];
  defaultEnemy: string[] = ["death-dog","giant-hyena", "glabrezu"];
  t1: Monsterdata[] = [];
  t2: Monsterdata[] = [];
  battleReport : String[][] = [];
  currentBattleRecord: String[]  = [];
  You: String = "Your Monster(Please select a monster)";
  Enemy: String = "Your Oponent(Please select a monster)";
  yourCurrentMonster: Monsterdata = {
    name: "",
    size: "",
    type: "",
    alignment: "",
    armor_class: [
      {
        type: "",
        value: ""
      }
    ],
    hit_points: 0,
    speed: {
      walk: "",
      fly: "",
      swim: null
    },
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    proficiencies: [],
    damage_vulnerabilities: [],
    damage_resistances: [],
    damage_immunities: [],
    condition_immunities: [
      {
        value: null,
        proficiency: null
      }
    ],
    senses: {
      blindsight: null,
      darkvision: "",
      passive_perception: 0
    },
    languages: "",
    challenge_rating: 0,
    xp: 0,
    special_abilities: [
      {
        name: "",
        desc: "",
        damage: null
      }
    ],
    actions: [
      {
        name: "",
        desc: "",
        damage: null
      }
    ],
    legendary_actions: [],
    image: null,
    url: ""
  };
  yourEnemyMonster: Monsterdata = {
    name: "",
    size: "",
    type: "",
    alignment: "",
    armor_class: [
      {
        type: "",
        value: ""
      }
    ],
    hit_points: 0,
    speed: {
      walk: "",
      fly: "",
      swim: null
    },
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    proficiencies: [],
    damage_vulnerabilities: [],
    damage_resistances: [],
    damage_immunities: [],
    condition_immunities: [
      {
        value: null,
        proficiency: null
      }
    ],
    senses: {
      blindsight: null,
      darkvision: "",
      passive_perception: 0
    },
    languages: "",
    challenge_rating: 0,
    xp: 0,
    special_abilities: [
      {
        name: "",
        desc: "",
        damage: null
      }
    ],
    actions: [
      {
        name: "",
        desc: "",
        damage: null
      }
    ],
    legendary_actions: [],
    image: null,
    url: ""
  };

  yourActions: [string, string, string[]][] = [];
  enemyActions: [string, string, string[]][] = [];

  yourMonsterHealth: number = 0;
  enemyMonsterHealth: number = 0;
  
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
  //   this.service.getItemList().subscribe({
  //     next: (value) => {
  //       this.item = value.item
  //       console.log(this.item)
  //   },
  //   error: error => {
  //     console.error(error)
  //     // Handle the error response
  //     // TODO: Add code for handling error response
  //   }
  // })
}
  setTeams(value: any) {
    this.t1[0] = value[0];
    this.t1[1] = value[1];
    this.t1[2] = value[2];
    this.t2[0] = value[3];
    this.t2[1] = value[4];
    this.t2[2] = value[5];
  }
  prepareData(data: Monsterdata, type: string) {
    if (type === "you") {
      this.You = data.name;
      this.yourCurrentMonster = data;
      this.yourActions = this.processActions(this.yourCurrentMonster.actions);
      console.log(this.yourActions);
    } else {
      this.Enemy = data.name;
      this.yourEnemyMonster = data;     
      this.enemyActions = this.processActions(this.yourEnemyMonster.actions);
      console.log(this.enemyActions);
    }
  }
  battleTime() {
    this.battleStatus = "Combat"
    const youGoFirst: boolean = this.determineSpeed()
    this.yourMonsterHealth = this.yourCurrentMonster.hit_points;
    this.enemyMonsterHealth = this.yourEnemyMonster.hit_points;

    let record : string = `Combat Begins`
    this.currentBattleRecord.push(record);
    if (!youGoFirst) {
      let record : string = `${this.yourEnemyMonster.name} outspeeds ${this.yourCurrentMonster.name} and goes first.`
      this.currentBattleRecord.push(record);
        this.combatCalculation(null, false);
    } else {
      `${this.yourCurrentMonster.name}  out speeds ${this.yourEnemyMonster.name}.`
      this.currentBattleRecord.push(record);
    }
  }

  combatCalculation(actions: any | null , turn: Boolean) {
    if (turn) {
      if (this.determineIfHits(actions[1], true)) {
      let damage : number = this.calculateDamage(actions[2])
      this.addToBattleRecord(damage, true)
      } else {
        this.addToBattleRecord(null, true)
      }
    }
   if (this.enemyMonsterHealth > 0) {
      // let attackChosen: number = this.getRandomInt( this.enemyActions[0].length - 1);
      let attackChosen: number = this.getRandomInt( this.enemyActions.length - 1);
      // console.log(this.enemyActions[0].length - 1)
      // console.log(attackChosen)
      // console.log(this.enemyActions)
      // console.log(this.enemyActions[attackChosen])
      let enemyChoice = this.enemyActions[attackChosen]
       if (this.determineIfHits(enemyChoice[1], false)) {
        let damage : number = this.calculateDamage(enemyChoice[2])
        this.addToBattleRecord(damage, false)
       } else {
        this.addToBattleRecord(null, false)
       }
   }
  }

  processActions(actions: any) {
    let queriedActions: [string, string, string[]][] = [];
    actions.forEach((element: any) => {
      if (element.damage != null) {
        queriedActions.push([element.name, element.desc, element.damage]);
      }
    })
    return queriedActions;
  }

  determineSpeed() {
    const numberRegex: RegExp = /\d+/;
    const speed1: string = this.yourCurrentMonster.speed.walk;
    const speed2: string = this.yourEnemyMonster.speed.walk;
    const match: RegExpMatchArray | null = speed1.match(numberRegex);
    const match2: RegExpMatchArray | null = speed2.match(numberRegex);
    if ( match != null && match2 != null && match[0] > match2[0]) {
            return true;
    } else {
      return false;
    }
  }

  determineIfHits(stringToProcess: string, value: Boolean) {
    const numberRegex: RegExp = /\d+/;
    const match: RegExpMatchArray | null = stringToProcess.match(numberRegex);
    if (match != null) {
      let diceRollResult = this.diceRolls(1, 20, parseInt(match[0]))
      // console.log("Rolled a : " + diceRollResult)
      if (value) {
        let AC = parseInt(this.yourEnemyMonster.armor_class[0].value);
        console.log("Your enemy AC is:" + AC)
        if (AC < diceRollResult ) {
          console.log("You should hit");
          return true;
        } else {
          // console.log("You Missed");
          false;
        }

      } else {
      let AC = parseInt(this.yourCurrentMonster.armor_class[0].value);
      // console.log("Your AC is:" + AC)
      if (AC < diceRollResult ) {
        // console.log("Enemy hits");
        return true;
      } else {
        // console.log("Enemy Misses");
        false;
      }
    }
  } 
  return false;
}

  addToBattleRecord(damage: number | null, user: boolean) {
    if (user) {
      if (damage != null) {
        let record : string = `${this.yourCurrentMonster.name} attacks ${this.yourEnemyMonster.name} dealing ${damage} damage to it.`
        this.currentBattleRecord.push(record);
        this.enemyMonsterHealth -= damage
        if (this.enemyMonsterHealth <= 0) {
          let record : string = `${this.yourEnemyMonster.name} succumbs to it's wounds.`
          this.currentBattleRecord.push(record);
        }
      } else {
        let record : string = `${this.yourCurrentMonster.name}  attempts to attack ${this.yourEnemyMonster.name} but fails.`
        this.currentBattleRecord.push(record);
      }
    } else {
      if (damage != null) {
        let record : string = `${this.yourEnemyMonster.name} attacks ${this.yourCurrentMonster.name} dealing ${damage} damage to it.`
        this.currentBattleRecord.push(record);
        this.yourMonsterHealth -= damage;
        if (this.yourMonsterHealth <= 0) {
          let record : string = `${this.yourCurrentMonster.name} succumbs to it's wounds.`
          this.currentBattleRecord.push(record);
        }
      } else {
        let record : string = `${this.yourEnemyMonster.name}  attempts to attack ${this.yourCurrentMonster.name} but fails.`
        this.currentBattleRecord.push(record);
      }
    }
    if (this.yourMonsterHealth <= 0 || this.enemyMonsterHealth <= 0 ) {
      let record : string = `Round over`
      this.currentBattleRecord.push(record);

      if (this.enemyMonsterHealth <= 0 && this.t2.length == 1) {
        this.battleStatus = "Victory"
      } else {
        this.battleStatus = "PostCombat"
      }
     
    }
  }

  calculateDamage(damageObject: any) {
    let damage : number = 0;
    for(let i = 0; i < damageObject.length; i ++) {
        let diceData: string[] = damageObject[i].damage_dice.split("+");
        const match = diceData[0].match(/\d+/g);
          if(match != null) {
            const numberOfRolls = parseInt(match[0], 10);
            const diceType = parseInt(match[1], 10);
            // console.log(numberOfRolls)
            // console.log(diceType)
            if (diceData.length > 1) {
              const match2 = diceData[1].match(/\d+/g);
              if(match2 != null) {
                const extraDamage = parseInt(match2[0], 10);
                console.log(extraDamage);
                damage += this.diceRolls(numberOfRolls, diceType, extraDamage)
                console.log(damage + " damage");
              }
            } else {
              damage += this.diceRolls(numberOfRolls, diceType, null)
              console.log(damage + " damage");
            }
          }
    }
    console.log("Final Damage from the round is : " + damage)
    return damage;
  }

  diceRolls(times: number, dice: number, rollModifier: number | null) {
    console.log("You are rolling " + times + "d" + dice + " + " + rollModifier)
    let number = 0
    if (rollModifier != null) {
      for (let i = 0; i < times; i++) {
        let safe = this.getRandomInt(dice)
        if (safe > 0) {
          number += safe
        } else  {
          number += (safe + 1)
        }
      }
      console.log(number);
      number += rollModifier;
    } else {
      for (let i = 0; i < times; i++) {
        let safe = this.getRandomInt(dice)
        if (safe > 0) {
          number += safe
        } else  {
          number += (safe + 1)
        }
      }
      console.log(number);
    }
    return number;
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  cleanUp(value: boolean) {
    //  clean the combat slate
    this.battleReport.push(this.currentBattleRecord);
    console.log(this.battleReport);
    this.currentBattleRecord = [];

    if (this.yourMonsterHealth <= 0) {
      let number = this.t1.indexOf(this.yourCurrentMonster);
      this.t1.splice(number, 1);

    } else {
      let number = this.t2.indexOf(this.yourEnemyMonster);
      this.t2.splice(number, 1);
    }

    // remove the monster who died from the set up.

    // persist Monster

    this. You = "Your Monster(Please select a monster)";
    this. Enemy = "Your Oponent(Please select a monster)";

    //  return to front

    if (value) {
      this.router.navigateByUrl(`/landing`)
      console.log("click")
    } else {
      this.battleStatus = "preCombat"
    }
   
  }

  async grabMonsterDataByName(team1: [string, string][], team2: string[]) {
    this.service.getTeamData(team1, team2).subscribe((value : any) => {
      this.setTeams(value)
    })
  }
}