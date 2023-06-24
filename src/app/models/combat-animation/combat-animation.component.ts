import { Component, Input, SimpleChanges } from '@angular/core';
import { Monsterdata } from 'src/app/interfaces/monsterdata';

@Component({
  selector: 'app-combat-animation',
  templateUrl: './combat-animation.component.html',
  styleUrls: ['./combat-animation.component.css']
})
export class CombatAnimationComponent {
 
  @Input() yourMonster: Monsterdata = {
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
  }

  descriptionWithImage : string = `This is an image: <img src="assets/transparent/${this.yourMonster.type}.png" alt="Image">`;
  @Input() enemyMonster: Monsterdata = {
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
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.yourMonster && changes.yourMonster.currentValue) {
  //     const type = changes.yourMonster.currentValue.type;
  //     this.descriptionWithImage = `This is an image: <img src="assets/transparent/${type}" alt="Image">`;
  //   }
  // }
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.yourMonster && changes.yourMonster.currentValue) {
  //     const type = changes.yourMonster.currentValue.type;
  //     this.descriptionWithImage = `This is an image: <img src="assets/transparent/${type}" alt="Image">`;
  //   }
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['yourMonster'] && changes['yourMonster'].currentValue) {
  //     const type = changes['yourMonster'].currentValue.type;
  //     this.descriptionWithImage = `Testing if it can change: <img src="assets/transparent/${type}.png" alt="Image">`;
  //   }
  // }


 

}
