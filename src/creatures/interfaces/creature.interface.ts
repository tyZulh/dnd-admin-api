import mongoose, { Document } from 'mongoose';
import { IOption } from 'src/common/interface';

interface IAction {
  readonly _id?: boolean;
  readonly name: string;
  readonly desc: string;
  readonly attack_bonus?: number;
  readonly damage?: IDamage[];
  readonly dc?: IDifficultyClass;
  readonly options?: IChoice;
  readonly usage?: IActionUsage;
  readonly multiattack_type: 'actions' | 'action_options';
  readonly actions: IActionOption[];
  readonly action_options: IChoice;
}

interface IActionOption {
  readonly _id?: boolean;
  readonly action_name: string;
  readonly count: number | string;
  readonly type: 'melee' | 'ranged' | 'ability' | 'magic';
}

interface IActionUsage {
  readonly _id?: boolean;
  readonly type: string;
  readonly dice?: string;
  readonly min_value?: number;
}

interface IChoice {
  readonly _id?: boolean;
  readonly desc?: string;
  readonly choose: number;
  readonly type: string;
  readonly from: OptionSet;
}

interface IDamage {
  readonly _id?: boolean;
  readonly damage_type: IAPIReference;
  readonly damage_dice: string;
}

type OptionSet =
  | IOptionsArrayOptionSet
  | IEquipmentCategoryOptionSet
  | IResourceListOptionSet;

interface IOptionsArrayOptionSet {
  readonly _id?: boolean;
  readonly option_set_type: 'options_array';
  readonly options: IOption[];
}

interface IEquipmentCategoryOptionSet {
  readonly _id?: boolean;
  readonly option_set_type: 'equipment_category';
  readonly equipment_category: IAPIReference;
}

interface IResourceListOptionSet {
  readonly _id?: boolean;
  readonly option_set_type: 'resource_list';
  readonly resource_list_url: IAPIReference;
}

type IArmorClass =
  | IArmorClassDex
  | IArmorClassNatural
  | IArmorClassArmor
  | IArmorClassSpell
  | IArmorClassCondition;

interface IArmorClassDex {
  readonly _id?: boolean;
  readonly type: 'dex';
  readonly value: number;
  readonly desc?: string;
}

interface IArmorClassNatural {
  readonly _id?: boolean;
  readonly type: 'natural';
  readonly value: number;
  readonly desc?: string;
}

interface IArmorClassArmor {
  readonly _id?: boolean;
  readonly type: 'armor';
  readonly value: number;
  readonly armor?: IAPIReference[]; // Equipment
  readonly desc?: string;
}

interface IArmorClassSpell {
  readonly _id?: boolean;
  readonly type: 'spell';
  readonly value: number;
  readonly spell: IAPIReference; // Spell
  readonly desc?: string;
}

interface IArmorClassCondition {
  readonly _id?: boolean;
  readonly type: 'condition';
  readonly value: number;
  readonly condition: IAPIReference; // Condition
  readonly desc?: string;
}

interface IAPIReference {
  readonly _id?: boolean;
  readonly index: string;
  readonly name: string;
  readonly url: string;
}

interface ILegendaryAction {
  readonly _id?: boolean;
  readonly name: string;
  readonly desc: string;
  readonly attack_bonus?: number;
  readonly damage?: IActionDamage[];
  readonly dc?: IDifficultyClass;
}

interface IActionDamage {
  readonly _id?: boolean;
  readonly damage_type: IAPIReference;
  readonly damage_dice: string;
}

interface IProficiency {
  readonly _id?: boolean;
  readonly proficiency: IAPIReference;
  readonly value: number;
}

interface IReaction {
  readonly _id?: boolean;
  readonly name: string;
  readonly desc: string;
  readonly dc?: IDifficultyClass;
}

interface ISense {
  readonly _id?: boolean;
  readonly blindsight?: string;
  readonly darkvision?: string;
  readonly passive_perception: number;
  readonly tremorsense?: string;
  readonly truesight?: string;
}

interface ISpecialAbilityUsage {
  readonly _id?: boolean;
  readonly type: string;
  readonly times?: number;
  readonly rest_types?: string[];
}

interface ISpeed {
  readonly _id?: boolean;
  readonly burrow?: string;
  readonly climb?: string;
  readonly fly?: string;
  readonly swim?: string;
  readonly walk?: string;
}
//   interface ISpell {
//     readonly _id?: boolean;
//     readonly name: string;
//     readonly level: number;
//     readonly url: string;
//     readonly notes?: string;
//     readonly usage?: ISpecialAbilityUsage;
//   };

interface ISpecialAbility {
  readonly _id?: boolean;
  readonly name: string;
  readonly desc: string;
  readonly attack_bonus?: number;
  readonly damage?: IActionDamage[];
  readonly dc?: IDifficultyClass;
  readonly spellcasting?: ISpecialAbilitySpellcasting;
  readonly usage: ISpecialAbilityUsage;
}

interface ISpecialAbilitySpellcasting {
  readonly _id?: boolean;
  readonly level?: number;
  readonly ability: IAPIReference;
  readonly dc?: number;
  readonly modifier?: number;
  readonly components_required: string[];
  readonly school?: string;
  readonly slots?: Record<string, number>;
  readonly spells: ISpecialAbilitySpell[];
}

interface ISpecialAbilitySpell {
  readonly _id?: boolean;
  readonly name: string;
  readonly level: number;
  readonly url: string;
  readonly notes?: string;
  readonly usage?: ISpecialAbilityUsage;
}

interface IDifficultyClass {
  readonly _id?: boolean;
  readonly dc_type: IAPIReference;
  readonly dc_value?: number;
  readonly success_type: 'none' | 'half' | 'other';
}

export interface ICreature extends Document {
  readonly _id?: mongoose.Types.ObjectId;
  readonly actions?: IAction[];
  readonly alignment: string;
  readonly armor_class: IArmorClass[];
  readonly challenge_rating: number;
  readonly charisma: number;
  readonly condition_immunities: IAPIReference[];
  readonly constitution: number;
  readonly damage_immunities: string[];
  readonly damage_resistances: string[];
  readonly damage_vulnerabilities: string[];
  readonly dexterity: number;
  readonly forms?: IAPIReference[];
  readonly hit_dice: string;
  readonly hit_points: number;
  readonly hit_points_roll: string;
  readonly image?: string;
  readonly index: string;
  readonly intelligence: number;
  readonly languages: string;
  readonly legendary_actions?: ILegendaryAction[];
  readonly name: string;
  readonly proficiencies: IProficiency[];
  readonly reactions?: IReaction[];
  readonly senses: ISense;
  readonly size: string;
  readonly special_abilities?: ISpecialAbility[];
  readonly speed: ISpeed;
  readonly strength: number;
  readonly subtype?: string;
  readonly type: string;
  readonly url: string;
  readonly wisdom: number;
  readonly xp: number;
}
