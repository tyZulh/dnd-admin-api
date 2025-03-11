import { Schema, model } from 'mongoose';

import {
  Action,
  ActionOption,
  ActionUsage,
  APIReference,
  ArmorClass,
  ArmorClassArmor,
  ArmorClassCondition,
  ArmorClassDex,
  ArmorClassNatural,
  ArmorClassSpell,
  Choice,
  DifficultyClass,
  Damage,
  LegendaryAction,
  OptionSet,
  Proficiency,
  Reaction,
  Sense,
  SpecialAbilityUsage,
  SpecialAbilitySpell,
  SpecialAbilitySpellcasting,
  SpecialAbility,
  Speed,
  Monster,
} from './types';

export const APIReferenceSchema = new Schema<APIReference>({
  _id: false,
  index: String,
  name: String,
  url: String,
});

const ActionOptionSchema = new Schema<ActionOption>({
  _id: false,
  action_name: String,
  count: Schema.Types.Mixed,
  type: {
    type: String,
    index: true,
    enum: ['melee', 'ranged', 'ability', 'magic'],
  },
});

const ActionUsageSchema = new Schema<ActionUsage>({
  _id: false,
  type: String,
  dice: String,
  min_value: Number,
});

const OptionSetSchema = new Schema<OptionSet>(
  {
    _id: false,
    option_set_type: {
      type: String,
      index: true,
      required: true,
      enum: ['equipment_category', 'resource_list', 'options_array'],
    },
  },
  { discriminatorKey: 'option_set_type', _id: false },
);

export const ChoiceSchema = new Schema<Choice>({
  _id: false,
  desc: String,
  choose: Number,
  type: String,
  from: OptionSetSchema,
});

export const DifficultyClassSchema = new Schema<DifficultyClass>({
  _id: false,
  dc_type: APIReferenceSchema,
  dc_value: Number,
  success_type: {
    type: String,
    index: true,
    enum: ['none', 'half', 'other'],
  },
});

export const DamageSchema = new Schema<Damage>({
  _id: false,
  damage_type: APIReferenceSchema,
  damage_dice: String,
});

const ActionSchema = new Schema<Action>({
  _id: false,
  name: String,
  desc: String,
  attack_bonus: Number,
  damage: [DamageSchema],
  dc: DifficultyClassSchema,
  usage: ActionUsageSchema,
  multiattack_type: {
    type: String,
    index: true,
    enum: ['actions', 'action_options'],
  },
  action_options: ChoiceSchema,
  actions: [ActionOptionSchema],
});

const ArmorClassSchema = new Schema<ArmorClass>(
  {
    _id: false,
    type: {
      type: String,
      index: true,
      enum: ['dex', 'natural', 'armor', 'spell', 'condition'],
    },
    desc: String,
    value: Number,
  },
  { discriminatorKey: 'type', _id: false },
);

ArmorClassSchema.discriminators = {};
ArmorClassSchema.discriminators.dex = new Schema<ArmorClassDex>({});

ArmorClassSchema.discriminators.natural = new Schema<ArmorClassNatural>({});

ArmorClassSchema.discriminators.armor = new Schema<ArmorClassArmor>({
  armor: [APIReferenceSchema],
});

ArmorClassSchema.discriminators.spell = new Schema<ArmorClassSpell>({
  spell: APIReferenceSchema,
});

ArmorClassSchema.discriminators.condition = new Schema<ArmorClassCondition>({
  condition: APIReferenceSchema,
});

const LegendaryActionSchema = new Schema<LegendaryAction>({
  _id: false,
  name: String,
  desc: String,
  attack_bonus: Number,
  damage: [DamageSchema],
  dc: DifficultyClassSchema,
});

const ProficiencySchema = new Schema<Proficiency>({
  _id: false,
  proficiency: APIReferenceSchema,
  value: Number,
});

const ReactionSchema = new Schema<Reaction>({
  _id: false,
  name: String,
  desc: String,
  dc: DifficultyClassSchema,
});

const SenseSchema = new Schema<Sense>({
  _id: false,
  blindsight: String,
  darkvision: String,
  passive_perception: Number,
  tremorsense: String,
  truesight: String,
});

const SpecialAbilityUsageSchema = new Schema<SpecialAbilityUsage>({
  _id: false,
  type: String,
  times: Number,
  rest_types: [String],
});

const SpecialAbilitySpellSchema = new Schema<SpecialAbilitySpell>({
  _id: false,
  name: String,
  level: Number,
  url: String,
  notes: String,
  usage: SpecialAbilityUsageSchema,
});

const SpecialAbilitySpellcastingSchema = new Schema<SpecialAbilitySpellcasting>(
  {
    _id: false,
    level: Number,
    ability: APIReferenceSchema,
    dc: Number,
    modifier: Number,
    components_required: [String],
    school: String,
    // As this has keys that are numbers, we have to use an `Object`, which you can't query subfields
    slots: Object,
    spells: [SpecialAbilitySpellSchema],
  },
);

const SpecialAbilitySchema = new Schema<SpecialAbility>({
  _id: false,
  name: String,
  desc: String,
  attack_bonus: Number,
  damage: [DamageSchema],
  dc: DifficultyClassSchema,
  spellcasting: SpecialAbilitySpellcastingSchema,
  usage: SpecialAbilityUsageSchema,
});

const SpeedSchema = new Schema<Speed>({
  _id: false,
  burrow: String,
  climb: String,
  fly: String,
  swim: String,
  walk: String,
});

const Monster = new Schema<Monster>({
  _id: String,
  actions: [ActionSchema],
  alignment: String,
  armor_class: [ArmorClassSchema],
  challenge_rating: Number,
  charisma: Number,
  condition_immunities: [APIReferenceSchema],
  constitution: Number,
  damage_immunities: [String],
  damage_resistances: [String],
  damage_vulnerabilities: [String],
  dexterity: Number,
  hit_dice: String,
  hit_points: Number,
  hit_points_roll: String,
  image: String,
  index: String,
  intelligence: Number,
  languages: String,
  legendary_actions: [LegendaryActionSchema],
  name: String,
  proficiencies: [ProficiencySchema],
  reactions: [ReactionSchema],
  senses: SenseSchema,
  size: String,
  special_abilities: [SpecialAbilitySchema],
  speed: SpeedSchema,
  strength: Number,
  subtype: String,
  type: String,
  url: String,
  wisdom: Number,
  xp: Number,
});

export default model('Monster', Monster, 'monsters');
