import { Component } from '@angular/core';
import { Monsterdata } from 'src/app/interfaces/monsterdata';
import { Item } from 'src/app/interfaces/item';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent {

  constructor(private service: ServiceService, private router: Router) {}

  battleChoice : String = "preChoice"

  availableItems : Item[] = [];
  battleStatus: string = "preCombat";
  yourTeam: [string, string, string][] = [];
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

  yourAc: number = 0;
  enemyAc: number = 0;
  
  profBonus: number = 0;
  ngOnInit() {
    const token : any = sessionStorage.getItem("yourTeam");
    const enemy : any = sessionStorage.getItem("enemyTeam")
    const jwt : string | null = sessionStorage.getItem("key");
    if (token) {
    this.yourTeam = JSON.parse(token);
    }


    let value : any = JSON.parse(enemy);
    
    this.defaultEnemy = [value[0][1], value[1][1], value[2][1]]

    if (jwt) {
      this.grabMonsterDataByName(this.yourTeam, this.defaultEnemy, jwt);
      this.service.getItemList(jwt).subscribe((value : any) => {
        for (let i = 0; i < value.item.length; i++) {
          this.availableItems[i] = value.item[i];
        }
      })
    }
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
      this.yourAc = parseInt(this.yourCurrentMonster.armor_class[0].value)
 
    
      this.yourActions = this.processActions(this.yourCurrentMonster.actions);
      this.calculateProfBonus(this.yourActions[0])
    } else {
      this.Enemy = data.name;
      this.yourEnemyMonster = data;     
      this.enemyActions = this.processActions(this.yourEnemyMonster.actions);
      this.enemyAc = parseInt(this.yourEnemyMonster.armor_class[0].value)
      console.log(this.enemyAc);
      
    }
  }
  // Starts combat 
  battleTime() {
    this.battleStatus = "Combat"
    this.currentBattleRecord.push("Combat Begins");
    const youGoFirst: boolean = this.determineSpeed()
    this.yourMonsterHealth = this.yourCurrentMonster.hit_points;
    this.enemyMonsterHealth = this.yourEnemyMonster.hit_points;
  
    if (!youGoFirst) {
      this.currentBattleRecord.push(`${this.yourEnemyMonster.name} outspeeds ${this.yourCurrentMonster.name} and goes first.`);
        this.combatCalculation(null, false);
    } else {
      this.currentBattleRecord.push(  `${this.yourCurrentMonster.name}  out speeds ${this.yourEnemyMonster.name}. Your monster makes the first move.`);
    }
  }

  // code that checks if attack hits or not.
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
      let attackChosen: number = this.getRandomInt( this.enemyActions.length - 1);
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

  calculateProfBonus(action : any) {
console.log(action[1]);
const numberRegex: RegExp = /\d+/;
const match: RegExpMatchArray | null = action[1].match(numberRegex);
if (match)
console.log(match[0]);
if (match)
 this.profBonus = parseInt(match[0]) - this.yourCurrentMonster.strength;
 console.log(this.yourCurrentMonster.strength);
 console.log(this.profBonus);
  }
// determine who goes first
  determineSpeed() {
    const numberRegex: RegExp = /\d+/;
    const speed1: string = this.yourCurrentMonster.speed.walk;
    const speed2: string = this.yourEnemyMonster.speed.walk;
    const match: RegExpMatchArray | null = speed1.match(numberRegex);
    const match2: RegExpMatchArray | null = speed2.match(numberRegex);

    let roll : number = this.diceRolls(1, 20, null);
    let roll2 : number = this.diceRolls(1, 20, null);

    if (match != null && match2 != null) {
      let yourFullSpeed : number = parseInt(match[0], 10) + roll
      let enemyFullSpeed : number =   parseInt(match2[0], 10) + roll2

      this.currentBattleRecord.push(`${this.yourCurrentMonster.name} and ${this.yourEnemyMonster.name} rolls for  inititive`);

      this.currentBattleRecord.push(`${this.yourCurrentMonster.name} rolls a ${roll} which with a natural speed of ${speed1} gives a max speed of ${yourFullSpeed} `);
  
      this.currentBattleRecord.push(`${this.yourEnemyMonster.name} rolls a ${roll2} which with a natural speed of ${speed2} gives a max speed of ${enemyFullSpeed}`);

      if (yourFullSpeed > enemyFullSpeed) {
        return true;
      } else {
        false
      }
    }
    return false;
  }

  determineIfHits(stringToProcess: string, value: Boolean) {
    const numberRegex: RegExp = /\d+/;
    const match: RegExpMatchArray | null = stringToProcess.match(numberRegex);
    if (match != null) {
      let diceRollResult = this.diceRolls(1, 20, parseInt(match[0]))
      
      if (value) {
        let total : number = this.profBonus + this.yourCurrentMonster.strength 
        console.log(this.profBonus);
        console.log(this.yourCurrentMonster.strength)
        console.log(total);
        let yourDiceRoll = this.diceRolls(1, 20, total)
        this.currentBattleRecord.push(`${this.yourCurrentMonster.name} makes a attack roll, rolling a ${yourDiceRoll}`)
        let AC = this.enemyAc
    
        if (AC < yourDiceRoll ) {
          this.currentBattleRecord.push(`${this.yourEnemyMonster.name} has a Ac of ${AC}, so the attack hits.`)
          return true;
        } else {
          this.currentBattleRecord.push(`${this.yourEnemyMonster.name} has a Ac of ${AC}, so the attack misses.`)
          false;
        }

      } else {
        this.currentBattleRecord.push(`${this.yourEnemyMonster.name} makes a attack roll, rolling a ${diceRollResult}`)
      let AC = this.yourAc
    
      if (AC < diceRollResult ) {
        this.currentBattleRecord.push(`${this.yourCurrentMonster.name} has a Ac of ${AC}, so the attack hits.`)
        return true;
      } else {
        this.currentBattleRecord.push(`${this.yourCurrentMonster.name} has a Ac of ${AC}, so the attack misses.`)
        false;
      }
    }
  } 
  return false;
}

  addToBattleRecord(damage: number | null, user: boolean) {
    if (user) {
      if (damage != null) {
        let record : string = `${this.yourEnemyMonster.name} takes ${damage} damage.`
        this.currentBattleRecord.push(record);
        this.enemyMonsterHealth -= damage
        if (this.enemyMonsterHealth <= 0) {
          let record : string = `${this.yourEnemyMonster.name} succumbs to it's wounds.`
          this.currentBattleRecord.push(record);
        }
      } else {
        // let record : string = `${this.yourCurrentMonster.name}  attempts to attack ${this.yourEnemyMonster.name} but fails.`
        // this.currentBattleRecord.push(record);
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
           
            if (diceData.length > 1) {
              const match2 = diceData[1].match(/\d+/g);
              if(match2 != null) {
                const extraDamage = parseInt(match2[0], 10);
             
                damage += this.diceRolls(numberOfRolls, diceType, extraDamage)
               
              }
            } else {
              damage += this.diceRolls(numberOfRolls, diceType, null)
          
            }
          }
    }
  
    return damage;
  }

  diceRolls(times: number, dice: number, rollModifier: number | null) {
   
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
      
    }
    return number;
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  cleanUp(value: boolean) {
    //  clean the combat slate
    this.battleReport.push(this.currentBattleRecord);
   
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
     
    } else {
      this.battleStatus = "preCombat"
    }
   
  }

  async grabMonsterDataByName(team1: [string, string, string][], team2: string[], jwt: string) {
    this.service.getTeamData(team1, team2, jwt).subscribe((value : any) => {
      this.setTeams(value)
    })
  }

  useItem(item: Item) {
if (item.itemType == "atk-boost-all") {
console.log("boost");
this.currentBattleRecord.push(`You use the ${item.itemName} on your  ${this.yourCurrentMonster.name} boosting it's strength and it's proficiency bonus by ${item.itemBonus}`)
} else if (item.itemType == "ac-lower") {
  console.log(this.enemyAc);
  this.enemyAc = this.enemyAc - item.itemBonus
  this.currentBattleRecord.push(`You use the ${item.itemName} on ${this.yourEnemyMonster.name} decreasing its Armor class by ${item.itemBonus}`)
} else if (item.itemType == "restore-health") {
  console.log("healing!!!");
  this.yourMonsterHealth = this.yourMonsterHealth + item.itemBonus
  this.currentBattleRecord.push(`You use the ${item.itemName} on your  ${this.yourCurrentMonster.name} restoring its health by ${item.itemBonus}`)

} else if (item.itemType == "health-lower") {
  console.log("poison!");
  this.enemyMonsterHealth = this.enemyMonsterHealth - item.itemBonus
  this.currentBattleRecord.push(`You use the ${item.itemName} on ${this.yourEnemyMonster.name} decreasing its health by ${item.itemBonus}`)
  
}
this.availableItems = this.availableItems.filter((element) => element !== item);

  }
}