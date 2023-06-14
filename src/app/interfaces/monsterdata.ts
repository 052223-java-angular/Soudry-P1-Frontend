export interface Monsterdata {
        name: string;
        size: string;
        type: string;
        alignment: string;
        armor_class: {
          type: string;
          value: string;
        }[];
        hit_points: number;
        speed: {
          walk: string;
          fly: string;
          swim: string | null;
        };
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
        proficiencies: any[]; // You can replace 'any' with specific types if available
        damage_vulnerabilities: string[];
        damage_resistances: string[];
        damage_immunities: string[];
        condition_immunities: {
          value: string | null;
          proficiency: string | null;
        }[];
        senses: {
          blindsight: string | null;
          darkvision: string;
          passive_perception: number;
        };
        languages: string;
        challenge_rating: number;
        xp: number;
        special_abilities: {
          name: string;
          desc: string;
          damage: any | null; // You can replace 'any' with specific types if available
        }[];
        actions: {
          name: string;
          desc: string;
          damage: {
            damage_type: {
              name: string;
            };
            damage_dice: string;
          }[] | null;
        }[];
        legendary_actions: any[]; // You can replace 'any' with specific types if available
        image: string | null;
        url: string;
}