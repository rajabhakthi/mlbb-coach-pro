export type Role = "Tank" | "Fighter" | "Assassin" | "Mage" | "Marksman" | "Support";
export type Lane = "EXP" | "Mid" | "Jungle" | "Gold" | "Roam";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Tier = "S+" | "S" | "A" | "B" | "C";

export interface Hero {
  slug: string;
  name: string;
  role: Role;
  secondaryRole?: Role;
  lane: Lane;
  difficulty: Difficulty;
  specialty: string;
  tier: Tier;
  winRate: number;
  pickRate: number;
  banRate: number;
  accent: string; // gradient
  tagline: string;
  skills: { key: string; name: string; desc: string; cooldown: string; cost: string; tip: string }[];
  combo: string[];
  builds: { name: "Standard" | "Burst" | "Tank" | "Pro Build"; items: string[] }[];
  counters: string[];
  synergies: string[];
}

const g = (a: string, b: string) => `linear-gradient(135deg, ${a}, ${b})`;

export const heroes: Hero[] = [
  {
    slug: "lancelot", name: "Lancelot", role: "Assassin", lane: "Jungle", difficulty: "Hard",
    specialty: "Charge / Reap", tier: "S", winRate: 51.4, pickRate: 8.2, banRate: 12.6,
    accent: g("#7c3aed", "#0ea5e9"), tagline: "Elegance is the deadliest blade.",
    skills: [
      { key: "Passive", name: "Soul Cutter", desc: "Consecutive hits deal bonus damage.", cooldown: "—", cost: "—", tip: "Always chain abilities to stack passive." },
      { key: "1", name: "Puncture", desc: "Dashes through enemies dealing damage.", cooldown: "9s", cost: "55", tip: "Use to engage or escape." },
      { key: "2", name: "Thorned Rose", desc: "Marks enemies, second cast deals burst.", cooldown: "10s", cost: "75", tip: "Mark squishies first." },
      { key: "Ult", name: "Phantom Execution", desc: "Untargetable dash dealing massive damage.", cooldown: "36s", cost: "120", tip: "Save for cleanup or escape." },
    ],
    combo: ["Skill 2", "Skill 1", "Basic Attack", "Ultimate"],
    builds: [
      { name: "Standard", items: ["Swift Boots", "War Axe", "Blade of Despair", "Endless Battle", "Malefic Roar", "Immortality"] },
      { name: "Burst", items: ["Magic Shoes", "Hunter Strike", "Blade of Despair", "Berserker's Fury", "Malefic Roar", "Wind of Nature"] },
      { name: "Tank", items: ["Warrior Boots", "Bloodlust Axe", "Queen's Wings", "Brute Force Breastplate", "Athena's Shield", "Immortality"] },
      { name: "Pro Build", items: ["Tough Boots", "War Axe", "Endless Battle", "Blade of Despair", "Queen's Wings", "Immortality"] },
    ],
    counters: ["khufra", "saber", "chou"],
    synergies: ["angela", "estes", "tigreal"],
  },
  {
    slug: "fanny", name: "Fanny", role: "Assassin", lane: "Jungle", difficulty: "Hard",
    specialty: "Burst / Charge", tier: "S+", winRate: 48.9, pickRate: 6.1, banRate: 22.4,
    accent: g("#0ea5e9", "#22d3ee"), tagline: "Freedom in the air.",
    skills: [
      { key: "Passive", name: "Air Superiority", desc: "Cables refresh on kills.", cooldown: "—", cost: "—", tip: "Plan flight paths." },
      { key: "1", name: "Tornado Strike", desc: "Cone damage and slow.", cooldown: "5s", cost: "40", tip: "Used after landing." },
      { key: "2", name: "Steel Cable", desc: "Latches to terrain to swing.", cooldown: "0s", cost: "20", tip: "Practice double cables." },
      { key: "Ult", name: "Cut Throat", desc: "High burst on a single target.", cooldown: "35s", cost: "150", tip: "Combo with cables for a one-shot." },
    ],
    combo: ["Cable", "Cable", "Ultimate", "Skill 1"],
    builds: [
      { name: "Standard", items: ["Swift Boots", "War Axe", "Endless Battle", "Blade of Despair", "Malefic Roar", "Immortality"] },
      { name: "Burst", items: ["Magic Shoes", "Hunter Strike", "Berserker's Fury", "Blade of Despair", "Malefic Roar", "Wind of Nature"] },
      { name: "Tank", items: ["Tough Boots", "Bloodlust Axe", "Queen's Wings", "Athena's Shield", "Brute Force Breastplate", "Immortality"] },
      { name: "Pro Build", items: ["Swift Boots", "War Axe", "Endless Battle", "Blade of Despair", "Queen's Wings", "Immortality"] },
    ],
    counters: ["khufra", "ruby", "minsitthar"],
    synergies: ["tigreal", "atlas", "angela"],
  },
  {
    slug: "tigreal", name: "Tigreal", role: "Tank", lane: "Roam", difficulty: "Easy",
    specialty: "Crowd Control", tier: "S", winRate: 53.2, pickRate: 9.1, banRate: 4.3,
    accent: g("#f59e0b", "#ef4444"), tagline: "For the Empire!",
    skills: [
      { key: "Passive", name: "Fearless", desc: "Reduces damage taken with stacks.", cooldown: "—", cost: "—", tip: "Engage with stacks up." },
      { key: "1", name: "Attack Wave", desc: "Cone damage and slow.", cooldown: "8s", cost: "70", tip: "Use to pull jungle camps." },
      { key: "2", name: "Sacred Hammer", desc: "Dash + knock up follow-up.", cooldown: "10s", cost: "80", tip: "Cancel into ult for combo." },
      { key: "Ult", name: "Implosion", desc: "Pulls and stuns enemies around you.", cooldown: "42s", cost: "150", tip: "Flicker + ult is iconic." },
    ],
    combo: ["Flicker", "Ultimate", "Skill 2", "Skill 1"],
    builds: [
      { name: "Standard", items: ["Tough Boots", "Dominance Ice", "Athena's Shield", "Antique Cuirass", "Immortality", "Guardian Helmet"] },
      { name: "Burst", items: ["Magic Shoes", "Glowing Wand", "Concentrated Energy", "Lightning Truncheon", "Immortality", "Holy Crystal"] },
      { name: "Tank", items: ["Warrior Boots", "Courage Mask", "Athena's Shield", "Antique Cuirass", "Immortality", "Brute Force Breastplate"] },
      { name: "Pro Build", items: ["Tough Boots", "Dominance Ice", "Athena's Shield", "Oracle", "Immortality", "Guardian Helmet"] },
    ],
    counters: ["diggie", "khufra"],
    synergies: ["fanny", "ling", "harith"],
  },
  {
    slug: "kagura", name: "Kagura", role: "Mage", lane: "Mid", difficulty: "Hard",
    specialty: "Burst / Reap", tier: "S", winRate: 50.7, pickRate: 5.3, banRate: 8.1,
    accent: g("#ec4899", "#8b5cf6"), tagline: "The umbrella commands fate.",
    skills: [
      { key: "Passive", name: "Yin Yang Gathering", desc: "Stacks empower next skill.", cooldown: "—", cost: "—", tip: "Track stacks for burst." },
      { key: "1", name: "Seimei Umbrella Open", desc: "Sends umbrella forward, deals damage.", cooldown: "5s", cost: "75", tip: "Throw before engaging." },
      { key: "2", name: "Rasho Umbrella Flee", desc: "Blink with shield.", cooldown: "11s", cost: "60", tip: "Use for repositioning." },
      { key: "Ult", name: "Yin Yang Overturn", desc: "Massive AoE damage and CC.", cooldown: "30s", cost: "150", tip: "Combo with skill 1 for true burst." },
    ],
    combo: ["Skill 1", "Skill 2", "Ultimate", "Skill 1 Recall"],
    builds: [
      { name: "Standard", items: ["Arcane Boots", "Clock of Destiny", "Lightning Truncheon", "Holy Crystal", "Divine Glaive", "Immortality"] },
      { name: "Burst", items: ["Magic Shoes", "Genius Wand", "Holy Crystal", "Divine Glaive", "Blood Wings", "Winter Truncheon"] },
      { name: "Tank", items: ["Magic Shoes", "Enchanted Talisman", "Athena's Shield", "Immortality", "Concentrated Energy", "Glowing Wand"] },
      { name: "Pro Build", items: ["Arcane Boots", "Clock of Destiny", "Lightning Truncheon", "Holy Crystal", "Winter Truncheon", "Blood Wings"] },
    ],
    counters: ["harley", "natalia"],
    synergies: ["tigreal", "atlas", "khufra"],
  },
  {
    slug: "miya", name: "Miya", role: "Marksman", lane: "Gold", difficulty: "Easy",
    specialty: "Reap", tier: "A", winRate: 52.0, pickRate: 7.4, banRate: 1.8,
    accent: g("#22d3ee", "#a78bfa"), tagline: "Moonlight, guide my arrow.",
    skills: [
      { key: "Passive", name: "Moon Blessing", desc: "Attack speed empowered shots.", cooldown: "—", cost: "—", tip: "Stack before fights." },
      { key: "1", name: "Moon Arrow", desc: "Each attack splits into two.", cooldown: "6s", cost: "30", tip: "Excellent waveclear." },
      { key: "2", name: "Arrow of Eclipse", desc: "AoE slow and damage.", cooldown: "8s", cost: "70", tip: "Use to zone enemies." },
      { key: "Ult", name: "Hidden Moonlight", desc: "Invisibility + attack speed buff.", cooldown: "46s", cost: "100", tip: "Reposition or escape." },
    ],
    combo: ["Skill 2", "Ultimate", "Skill 1", "Basic Attack"],
    builds: [
      { name: "Standard", items: ["Swift Boots", "Demon Hunter Sword", "Windtalker", "Berserker's Fury", "Blade of Despair", "Immortality"] },
      { name: "Burst", items: ["Swift Boots", "Berserker's Fury", "Blade of Despair", "Endless Battle", "Malefic Roar", "Wind of Nature"] },
      { name: "Tank", items: ["Warrior Boots", "Bloodlust Axe", "Athena's Shield", "Wind of Nature", "Immortality", "Blade of Despair"] },
      { name: "Pro Build", items: ["Swift Boots", "Corrosion Scythe", "Windtalker", "Berserker's Fury", "Blade of Despair", "Wind of Nature"] },
    ],
    counters: ["saber", "natalia", "helcurt"],
    synergies: ["angela", "tigreal", "estes"],
  },
  {
    slug: "estes", name: "Estes", role: "Support", lane: "Roam", difficulty: "Easy",
    specialty: "Regen", tier: "A", winRate: 54.6, pickRate: 4.1, banRate: 6.7,
    accent: g("#10b981", "#22d3ee"), tagline: "Light of the moon, heal my friends.",
    skills: [
      { key: "Passive", name: "Moon Power", desc: "Empowered skills with stacks.", cooldown: "—", cost: "—", tip: "Always stack before fights." },
      { key: "1", name: "Moonlight Immersion", desc: "Heals an ally over time.", cooldown: "7s", cost: "90", tip: "Cast on engaging carry." },
      { key: "2", name: "Domain of Moon Goddess", desc: "AoE slow and damage.", cooldown: "11s", cost: "85", tip: "Zone enemies in fights." },
      { key: "Ult", name: "Blessing of Moon Goddess", desc: "Massive AoE heal over time.", cooldown: "60s", cost: "150", tip: "Use proactively before burst." },
    ],
    combo: ["Skill 2", "Ultimate", "Skill 1"],
    builds: [
      { name: "Standard", items: ["Magic Shoes", "Enchanted Talisman", "Clock of Destiny", "Lightning Truncheon", "Immortality", "Holy Crystal"] },
      { name: "Burst", items: ["Magic Shoes", "Glowing Wand", "Holy Crystal", "Divine Glaive", "Blood Wings", "Winter Truncheon"] },
      { name: "Tank", items: ["Magic Shoes", "Courage Mask", "Athena's Shield", "Antique Cuirass", "Immortality", "Oracle"] },
      { name: "Pro Build", items: ["Magic Shoes", "Enchanted Talisman", "Oracle", "Clock of Destiny", "Immortality", "Holy Crystal"] },
    ],
    counters: ["karrie", "baxia"],
    synergies: ["miya", "layla", "hanabi"],
  },
  {
    slug: "chou", name: "Chou", role: "Fighter", secondaryRole: "Assassin", lane: "EXP", difficulty: "Medium",
    specialty: "Crowd Control / Charge", tier: "S+", winRate: 52.5, pickRate: 10.4, banRate: 28.1,
    accent: g("#f97316", "#facc15"), tagline: "The way of the dragon.",
    skills: [
      { key: "Passive", name: "Only Fast", desc: "Periodic immunity to slows.", cooldown: "—", cost: "—", tip: "Time engages." },
      { key: "1", name: "Jeet Kune Do", desc: "Three-hit combo.", cooldown: "6s", cost: "—", tip: "Use 3rd hit for knockup." },
      { key: "2", name: "Shunpo", desc: "Quick dash with bonus damage.", cooldown: "9s", cost: "30", tip: "Reposition or engage." },
      { key: "Ult", name: "The Way of Dragon", desc: "Kicks enemies into the air.", cooldown: "40s", cost: "100", tip: "Pick targets carefully." },
    ],
    combo: ["Skill 2", "Ultimate", "Skill 1"],
    builds: [
      { name: "Standard", items: ["Warrior Boots", "War Axe", "Endless Battle", "Blade of Despair", "Athena's Shield", "Immortality"] },
      { name: "Burst", items: ["Tough Boots", "Hunter Strike", "Endless Battle", "Blade of Despair", "Malefic Roar", "Queen's Wings"] },
      { name: "Tank", items: ["Warrior Boots", "Courage Mask", "Athena's Shield", "Brute Force Breastplate", "Immortality", "Dominance Ice"] },
      { name: "Pro Build", items: ["Warrior Boots", "War Axe", "Endless Battle", "Queen's Wings", "Athena's Shield", "Immortality"] },
    ],
    counters: ["khufra", "diggie"],
    synergies: ["fanny", "kagura", "lancelot"],
  },
  {
    slug: "khufra", name: "Khufra", role: "Tank", lane: "Roam", difficulty: "Medium",
    specialty: "Crowd Control", tier: "S", winRate: 50.1, pickRate: 7.7, banRate: 18.3,
    accent: g("#a3e635", "#0ea5e9"), tagline: "The bandit king strikes.",
    skills: [
      { key: "Passive", name: "Spell Curse", desc: "Damages enemies who CC you.", cooldown: "—", cost: "—", tip: "Bait CC to punish." },
      { key: "1", name: "Tyrant's Revenge", desc: "Leap and knock up.", cooldown: "10s", cost: "70", tip: "Engage opener." },
      { key: "2", name: "Bouncing Ball", desc: "Bounce and damage.", cooldown: "10s", cost: "60", tip: "Cancel dash heroes." },
      { key: "Ult", name: "Tyrant's Rage", desc: "Knocks back and slows enemies.", cooldown: "42s", cost: "120", tip: "Push enemies into your team." },
    ],
    combo: ["Skill 2", "Skill 1", "Ultimate"],
    builds: [
      { name: "Standard", items: ["Tough Boots", "Courage Mask", "Athena's Shield", "Antique Cuirass", "Immortality", "Guardian Helmet"] },
      { name: "Burst", items: ["Magic Shoes", "Concentrated Energy", "Lightning Truncheon", "Holy Crystal", "Immortality", "Blood Wings"] },
      { name: "Tank", items: ["Warrior Boots", "Dominance Ice", "Athena's Shield", "Brute Force Breastplate", "Immortality", "Oracle"] },
      { name: "Pro Build", items: ["Tough Boots", "Courage Mask", "Athena's Shield", "Oracle", "Immortality", "Guardian Helmet"] },
    ],
    counters: ["diggie", "valir"],
    synergies: ["beatrix", "kagura", "lancelot"],
  },
];

export const heroBySlug = (slug: string) => heroes.find(h => h.slug === slug);

export interface Item {
  slug: string;
  name: string;
  category: "Attack" | "Magic" | "Defense" | "Jungle" | "Roam" | "Movement";
  cost: number;
  attributes: string[];
  passive?: string;
  buildPath?: string[];
  related?: string[];
  accent: string;
}

export const items: Item[] = [
  { slug: "blade-of-despair", name: "Blade of Despair", category: "Attack", cost: 3010, attributes: ["+170 Physical Attack", "+5% Movement Speed"], passive: "Despair: +25% damage vs HP < 50%.", related: ["malefic-roar", "endless-battle"], accent: g("#ef4444", "#f59e0b") },
  { slug: "malefic-roar", name: "Malefic Roar", category: "Attack", cost: 2060, attributes: ["+60 Physical Attack"], passive: "Physical Piercing 40%.", related: ["blade-of-despair"], accent: g("#f59e0b", "#fbbf24") },
  { slug: "endless-battle", name: "Endless Battle", category: "Attack", cost: 2470, attributes: ["+65 Physical Attack", "+250 HP"], passive: "Divine Justice — true damage on skill cast.", related: ["war-axe"], accent: g("#f97316", "#facc15") },
  { slug: "holy-crystal", name: "Holy Crystal", category: "Magic", cost: 2180, attributes: ["+100 Magic Power"], passive: "Mystery Shop: 21% magic power amplification.", related: ["blood-wings"], accent: g("#8b5cf6", "#ec4899") },
  { slug: "divine-glaive", name: "Divine Glaive", category: "Magic", cost: 2120, attributes: ["+65 Magic Power"], passive: "Magic Piercing 40%.", related: ["holy-crystal"], accent: g("#8b5cf6", "#3b82f6") },
  { slug: "athenas-shield", name: "Athena's Shield", category: "Defense", cost: 2150, attributes: ["+62 Magic Defense", "+900 HP"], passive: "Shielding from magic burst.", related: ["antique-cuirass"], accent: g("#3b82f6", "#06b6d4") },
  { slug: "antique-cuirass", name: "Antique Cuirass", category: "Defense", cost: 1860, attributes: ["+50 Physical Defense", "+920 HP"], passive: "Reduces enemy physical attack.", related: ["athenas-shield"], accent: g("#0ea5e9", "#22d3ee") },
  { slug: "war-axe", name: "War Axe", category: "Jungle", cost: 1900, attributes: ["+35 Physical Attack", "+550 HP"], passive: "Stacks ATK on skill use.", related: ["endless-battle"], accent: g("#ef4444", "#f97316") },
  { slug: "courage-mask", name: "Courage Mask", category: "Roam", cost: 2050, attributes: ["+30 Magic Power", "+600 HP"], passive: "Buffs nearby allies.", related: ["dominance-ice"], accent: g("#22d3ee", "#8b5cf6") },
  { slug: "swift-boots", name: "Swift Boots", category: "Movement", cost: 710, attributes: ["+15% Attack Speed", "+40 Movement Speed"], related: ["magic-shoes"], accent: g("#facc15", "#f97316") },
  { slug: "magic-shoes", name: "Magic Shoes", category: "Movement", cost: 710, attributes: ["+10% Cooldown Reduction", "+40 Movement Speed"], related: ["swift-boots"], accent: g("#8b5cf6", "#3b82f6") },
  { slug: "warrior-boots", name: "Warrior Boots", category: "Movement", cost: 710, attributes: ["+22 Physical Defense", "+40 Movement Speed"], accent: g("#0ea5e9", "#22d3ee") },
];

export const itemBySlug = (slug: string) => items.find(i => i.slug === slug);

export interface Emblem {
  slug: string;
  name: string;
  type: "Assassin" | "Mage" | "Marksman" | "Fighter" | "Tank" | "Support";
  effects: string[];
  bestFor: string[];
  recommendation: string;
  accent: string;
}

export const emblems: Emblem[] = [
  { slug: "assassin", name: "Assassin Emblem", type: "Assassin", effects: ["+ Adaptive Attack", "+ Physical Penetration", "+ Movement Speed"], bestFor: ["lancelot", "fanny"], recommendation: "Use Killing Spree talent for sustain in jungle skirmishes.", accent: g("#7c3aed", "#0ea5e9") },
  { slug: "mage", name: "Mage Emblem", type: "Mage", effects: ["+ Magic Power", "+ Magic Penetration", "+ CDR"], bestFor: ["kagura"], recommendation: "Magic Worship is the go-to talent for poke mages.", accent: g("#ec4899", "#8b5cf6") },
  { slug: "marksman", name: "Marksman Emblem", type: "Marksman", effects: ["+ Adaptive Attack", "+ Attack Speed", "+ Lifesteal"], bestFor: ["miya"], recommendation: "Weapon Master scales with most ADC build paths.", accent: g("#22d3ee", "#a78bfa") },
  { slug: "fighter", name: "Fighter Emblem", type: "Fighter", effects: ["+ Adaptive Attack", "+ Spell Vamp", "+ HP"], bestFor: ["chou"], recommendation: "Festival of Blood is essential for dive fighters.", accent: g("#f97316", "#facc15") },
  { slug: "tank", name: "Tank Emblem", type: "Tank", effects: ["+ HP", "+ Defense", "+ HP Regen"], bestFor: ["tigreal", "khufra"], recommendation: "Tenacity makes you an unstoppable engage tank.", accent: g("#f59e0b", "#ef4444") },
  { slug: "support", name: "Support Emblem", type: "Support", effects: ["+ Healing Effect", "+ Movement Speed", "+ Mana Regen"], bestFor: ["estes"], recommendation: "Focusing Mark is the gold-standard support talent.", accent: g("#10b981", "#22d3ee") },
];

export interface BattleSpell {
  slug: string;
  name: string;
  cooldown: string;
  description: string;
  recommended: string[];
  tip: string;
  accent: string;
}

export const battleSpells: BattleSpell[] = [
  { slug: "flicker", name: "Flicker", cooldown: "120s", description: "Blink a short distance in any direction.", recommended: ["tigreal", "kagura", "khufra"], tip: "Use Flicker for surprise engages or escapes.", accent: g("#facc15", "#f97316") },
  { slug: "retribution", name: "Retribution", cooldown: "35s", description: "Deals true damage to non-hero units. Required for junglers.", recommended: ["lancelot", "fanny"], tip: "Always max-rank Retribution as a jungler.", accent: g("#10b981", "#a3e635") },
  { slug: "execute", name: "Execute", cooldown: "75s", description: "Deals true damage scaling with target's missing HP.", recommended: ["miya", "kagura"], tip: "Secure low-HP escapees from afar.", accent: g("#ef4444", "#f97316") },
  { slug: "purify", name: "Purify", cooldown: "90s", description: "Removes CC and gains brief speed boost.", recommended: ["miya"], tip: "Use against heavy CC line-ups.", accent: g("#22d3ee", "#a78bfa") },
  { slug: "aegis", name: "Aegis", cooldown: "75s", description: "Grants a shield to you and nearby allies.", recommended: ["estes", "tigreal"], tip: "Cast before engaging objectives.", accent: g("#3b82f6", "#22d3ee") },
  { slug: "sprint", name: "Sprint", cooldown: "75s", description: "Brief movement speed boost.", recommended: ["miya"], tip: "Great for kiting marksmen.", accent: g("#facc15", "#22d3ee") },
];

export interface RoleInfo {
  slug: Role;
  description: string;
  strengths: string[];
  weaknesses: string[];
  bestEmblem: string;
  recommended: string[];
  accent: string;
}

export const roles: RoleInfo[] = [
  { slug: "Tank", description: "Front-line initiators that absorb damage and lock down enemies.", strengths: ["Engage", "Crowd Control", "Tanky"], weaknesses: ["Low Damage", "Vulnerable Solo"], bestEmblem: "Tank Emblem", recommended: ["tigreal", "khufra"], accent: g("#f59e0b", "#ef4444") },
  { slug: "Fighter", description: "Versatile bruisers strong in the EXP lane.", strengths: ["Sustained", "Dueling", "Split Push"], weaknesses: ["Falls Off", "Kited Easily"], bestEmblem: "Fighter Emblem", recommended: ["chou"], accent: g("#f97316", "#facc15") },
  { slug: "Assassin", description: "Burst damage specialists hunting back-line carries.", strengths: ["Burst", "Mobility"], weaknesses: ["Squishy", "Hard to Master"], bestEmblem: "Assassin Emblem", recommended: ["lancelot", "fanny"], accent: g("#7c3aed", "#0ea5e9") },
  { slug: "Mage", description: "Ranged AP damage dealers with utility or burst.", strengths: ["Wave Clear", "Burst", "Utility"], weaknesses: ["Squishy", "Mana Hungry"], bestEmblem: "Mage Emblem", recommended: ["kagura"], accent: g("#ec4899", "#8b5cf6") },
  { slug: "Marksman", description: "Late-game DPS dealing sustained ranged damage.", strengths: ["Scaling", "DPS"], weaknesses: ["Weak Early", "Needs Protection"], bestEmblem: "Marksman Emblem", recommended: ["miya"], accent: g("#22d3ee", "#a78bfa") },
  { slug: "Support", description: "Enable allies through healing, shielding, or vision.", strengths: ["Sustain", "Utility"], weaknesses: ["Low Damage"], bestEmblem: "Support Emblem", recommended: ["estes"], accent: g("#10b981", "#22d3ee") },
];

export const ranks = [
  { name: "Warrior", color: "#9ca3af", desc: "The beginning. Learn the basics." },
  { name: "Elite", color: "#a3e635", desc: "Improving fundamentals." },
  { name: "Master", color: "#22d3ee", desc: "Solid mechanics." },
  { name: "Grandmaster", color: "#3b82f6", desc: "Map awareness matters." },
  { name: "Epic", color: "#8b5cf6", desc: "Drafts begin to matter." },
  { name: "Legend", color: "#ec4899", desc: "Coordinated teamfights." },
  { name: "Mythic", color: "#f59e0b", desc: "Macro becomes king." },
  { name: "Mythical Honor", color: "#f97316", desc: "Disciplined decisions." },
  { name: "Mythical Glory", color: "#ef4444", desc: "Competitive level." },
  { name: "Mythical Immortal", color: "#fde047", desc: "Top of the ladder." },
];

export interface Patch {
  version: string;
  date: string;
  summary: string;
  buffed: string[];
  nerfed: string[];
  details: string;
}

export const patches: Patch[] = [
  { version: "1.9.20", date: "Jun 18, 2026", summary: "Tank meta adjustments and jungle pacing changes.", buffed: ["tigreal", "estes"], nerfed: ["fanny", "chou"], details: "Tigreal Sacred Hammer cooldown reduced. Fanny Cut Throat damage scaling lowered at early ranks." },
  { version: "1.9.18", date: "May 30, 2026", summary: "Marksman item rework continues. New items rolled out.", buffed: ["miya"], nerfed: ["kagura"], details: "Demon Hunter Sword passive reworked. Kagura Yin Yang Overturn AoE radius reduced." },
  { version: "1.9.16", date: "May 12, 2026", summary: "Quality of life updates and minor balance.", buffed: ["khufra", "lancelot"], nerfed: [], details: "Khufra Bouncing Ball cancel windows refined. Lancelot Soul Cutter stack window extended." },
];

export interface Guide {
  slug: string;
  title: string;
  category: "Beginner Guides" | "Hero Guides" | "Macro Strategy" | "Draft Strategy" | "Ranked Climbing";
  excerpt: string;
  readTime: string;
  accent: string;
}

export const guides: Guide[] = [
  { slug: "first-week", title: "Your First Week in MLBB", category: "Beginner Guides", excerpt: "Lane basics, what to buy first, and how to survive your first matches.", readTime: "6 min", accent: g("#22d3ee", "#3b82f6") },
  { slug: "lancelot-mastery", title: "Mastering Lancelot Jungle", category: "Hero Guides", excerpt: "Routes, combos, and mid-game power spikes for the king of jungle.", readTime: "9 min", accent: g("#7c3aed", "#0ea5e9") },
  { slug: "macro-101", title: "Macro 101: Objective Trading", category: "Macro Strategy", excerpt: "When to take Turtle, when to give up Lord, and the rotations that win.", readTime: "8 min", accent: g("#f59e0b", "#ef4444") },
  { slug: "drafting-counters", title: "Drafting & Counter-Picking", category: "Draft Strategy", excerpt: "How to read enemy comps and build a draft that wins teamfights.", readTime: "11 min", accent: g("#ec4899", "#8b5cf6") },
  { slug: "mythic-grind", title: "From Legend to Mythic", category: "Ranked Climbing", excerpt: "The single biggest mindset shift that unlocks Mythic for most players.", readTime: "7 min", accent: g("#10b981", "#a3e635") },
];

export const startHerePlans: Record<string, { nextRank: string; focus: string[]; heroes: string[]; modules: { title: string; desc: string }[] }> = {
  Warrior: {
    nextRank: "Elite",
    focus: ["Learn hero roles", "Understand lanes", "Learn basic item builds"],
    heroes: ["miya", "tigreal", "estes"],
    modules: [
      { title: "Understanding the map", desc: "Lanes, jungle, towers, and base flow." },
      { title: "Jungle basics", desc: "Camps, buffs, and clear order." },
      { title: "Item basics", desc: "Boots, core items, and when to recall." },
    ],
  },
  Elite: {
    nextRank: "Master",
    focus: ["Last hitting", "Recall timing", "Lane matchups"],
    heroes: ["miya", "tigreal", "khufra"],
    modules: [
      { title: "Wave management", desc: "Push vs freeze and why it matters." },
      { title: "Roaming basics", desc: "When to leave your lane to help." },
      { title: "Item paths", desc: "Building reactively to the enemy comp." },
    ],
  },
  Master: {
    nextRank: "Grandmaster",
    focus: ["Roaming", "Vision setup", "Hero matchups"],
    heroes: ["khufra", "estes", "chou"],
    modules: [
      { title: "Vision and warding", desc: "Where to place vision in early/mid game." },
      { title: "Roaming patterns", desc: "Turtle rotations and counter-roams." },
    ],
  },
  Grandmaster: {
    nextRank: "Epic",
    focus: ["Map awareness", "Objectives", "Positioning"],
    heroes: ["khufra", "chou", "kagura"],
    modules: [
      { title: "Map awareness", desc: "Use the minimap as your second screen." },
      { title: "Objectives", desc: "Turtle, Lord, and tower priority." },
      { title: "Positioning", desc: "Where to stand in fights by role." },
    ],
  },
  Epic: {
    nextRank: "Legend",
    focus: ["Drafting", "Counter picking", "Teamfight decisions"],
    heroes: ["chou", "khufra", "kagura"],
    modules: [
      { title: "Drafting flow", desc: "Picks, bans, and flex picks." },
      { title: "Counter picking", desc: "Building a comp that punishes theirs." },
      { title: "Teamfight roles", desc: "Engage, peel, follow-up." },
    ],
  },
  Legend: {
    nextRank: "Mythic",
    focus: ["Macro decisions", "Tempo", "Win conditions"],
    heroes: ["lancelot", "khufra", "kagura"],
    modules: [
      { title: "Tempo", desc: "Snowballing leads into objectives." },
      { title: "Win conditions", desc: "Identifying yours every draft." },
    ],
  },
  Mythic: {
    nextRank: "Mythical Honor",
    focus: ["Macro strategy", "Objective trading", "Competitive decisions"],
    heroes: ["lancelot", "fanny", "kagura"],
    modules: [
      { title: "Objective trading", desc: "Give Turtle to take Lord, and similar trades." },
      { title: "Power spikes", desc: "Force fights at your team's spike windows." },
    ],
  },
  "Mythical Honor": {
    nextRank: "Mythical Glory",
    focus: ["Shotcalling", "Discipline", "Consistency"],
    heroes: ["fanny", "khufra", "kagura"],
    modules: [
      { title: "Shotcalling", desc: "Clear voice or pings — never both teams calling." },
      { title: "Tilt control", desc: "How to win the next game, not the last one." },
    ],
  },
  "Mythical Glory": {
    nextRank: "Mythical Immortal",
    focus: ["Coaching mindset", "Meta study", "Pro draft theory"],
    heroes: ["fanny", "lancelot", "kagura"],
    modules: [
      { title: "Pro draft theory", desc: "Studying tournaments and applying patterns." },
      { title: "Coaching mindset", desc: "Lead, don't follow." },
    ],
  },
};
