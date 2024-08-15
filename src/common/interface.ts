export interface IAPIReference {
  _id?: boolean;
  index: string;
  name: string;
  url: string;
}

export interface IChoice {
  _id?: boolean;
  desc?: string;
  choose: number;
  type: string;
  from: IOptionSet;
}

export interface IAreaOfEffect {
  _id?: boolean;
  size: number;
  type: 'sphere' | 'cube' | 'cylinder' | 'line' | 'cone';
}

export type IOptionSet =
  | IOptionsArrayOptionSet
  | IEquipmentCategoryOptionSet
  | IResourceListOptionSet;

interface IOptionsArrayOptionSet {
  _id?: boolean;
  option_set_type: 'options_array';
  options: IOption[];
}

interface IEquipmentCategoryOptionSet {
  _id?: boolean;
  option_set_type: 'equipment_category';
  equipment_category: IAPIReference;
}

interface IResourceListOptionSet {
  _id?: boolean;
  option_set_type: 'resource_list';
  resource_list_url: string;
}

interface IDifficultyClass {
  _id?: boolean;
  dc_type: IAPIReference;
  dc_value?: number;
  success_type: 'none' | 'half' | 'other';
}

interface IDamage {
  _id?: boolean;
  damage_type: IAPIReference;
  damage_dice: string;
}

export type IOption =
  | IReferenceOption
  | IActionOption
  | IMultipleOption
  | IChoiceOption
  | IStringOption
  | IIdealOption
  | ICountedReferenceOption
  | IScorePrerequisiteOption
  | IAbilityBonusOption
  | IBreathOption
  | IDamageOption;

interface IReferenceOption {
  _id?: boolean;
  option_type: 'reference';
  item: IAPIReference;
}

interface IActionOption {
  _id?: boolean;
  option_type: 'action';
  action_name: string;
  count: number | string;
  type: 'melee' | 'ranged' | 'ability' | 'magic';
  notes: string;
}

interface IMultipleOption {
  _id?: boolean;
  option_type: 'multiple';
  items: IOption[];
}

interface IChoiceOption {
  _id?: boolean;
  option_type: 'choice';
  choice: IChoice;
}

interface IStringOption {
  _id?: boolean;
  option_type: 'string';
  string: string;
}

interface IIdealOption {
  _id?: boolean;
  option_type: 'ideal';
  desc: string;
  alignments: IAPIReference[];
}

interface ICountedReferenceOption {
  _id?: boolean;
  option_type: 'counted_reference';
  count: number;
  of: IAPIReference;
  prerequisites?: {
    type: 'proficiency';
    proficiency?: IAPIReference;
  }[];
}

interface IScorePrerequisiteOption {
  _id?: boolean;
  option_type: 'score_prerequisite';
  ability_score: IAPIReference;
  minimum_score: number;
}

interface IAbilityBonusOption {
  _id?: boolean;
  option_type: 'ability_bonus';
  ability_score: IAPIReference;
  bonus: number;
}

interface IBreathOption {
  _id?: boolean;
  option_type: 'breath';
  name: string;
  dc: IDifficultyClass;
  damage?: IDamage[];
}

interface IDamageOption {
  _id?: boolean;
  option_type: 'damage';
  damage_type: IAPIReference;
  damage_dice: string;
  notes: string;
}
