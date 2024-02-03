/**
 * Reverse calculate the defense provided by equipment only based on the
 * unbuffed sheet defense.
 *
 * @param {number} defense - The unbuffed defense value on the character sheet.
 * @param {number} boost - The amount of defense +% stats provided by equipment.
 * @param {number} vitality - The vitality value of the character.
 * @param {number} strength - The strength value of the character.
 * @param {number} magic - The magic value of the character.
 * @param {'physical' | 'magical'} type - The type of damage.
 * @returns {number} The calculated equipment defense value.
 */
export function calcEquipmentDefense(defense: number,
                                     boost: number,
                                     vitality: number,
                                     strength: number,
                                     magic: number,
                                     type: 'physical' | 'magical'): number {
  let stat;

  if (type === 'physical') {
    stat = strength;
  } else {
    stat = magic;
  }

  let raw = defense;

  if (boost > 0) {
    raw = (1.0 / (1.0 + boost)) * defense;
  }

  raw -= Math.round((vitality + stat - 2) / 4);

  if (type === 'physical') {
    raw -= 1;
  }

  raw /= (1 + Math.round(((2 * vitality) + (3 * stat)) / 25) / 100);

  return Math.round(raw);
}

/**
 * Calculates the damage reduction value provided by equipment.
 *
 * @param {number} defense - The sheet defense of the defending character.
 * @param {number} level - The level of the attacking character.
 * @returns {number} The calculated reduction value.
 */
export function calcReduction(defense: number, level: number): number {
  let reduction = defense / ((40 * level) + defense - 25);
  return Math.min(reduction, 0.95);
}

/**
 * Calculates the effective health.
 *
 * @param {number} health - The health of the defending character.
 * @param {number} level - The level of the defending character.
 * @param {number} defense - The sheet defense of the defending character.
 * @param {number} reduceDamage - The % damage reduction provided by stats.
 * @param {number} defenseLevel - The defense level of the defending character.
 * @param {number} attackLevel - The attack level of the attacking character.
 * @returns {number} The calculated effective health of the defending.
 */
export function calcEffectiveHealth(health: number,
                                    level: number,
                                    defense: number,
                                    reduceDamage: number,
                                    defenseLevel: number,
                                    attackLevel: number): number {
  let reduction = calcReduction(defense, level);
  let effectiveHealth = health;

  if (attackLevel > defenseLevel) {
    effectiveHealth /= (1 - reduction);
    effectiveHealth /= (1 - reduceDamage);
    effectiveHealth /= (1 + (attackLevel - defenseLevel) / 100);
  } else {
    effectiveHealth *= (1 + (1.2 * (defenseLevel - attackLevel) / 100));
    effectiveHealth /= (1 - reduction);
    effectiveHealth /= (1 - reduceDamage);
  }

  return Math.floor(effectiveHealth);
}

/**
 * Calculates the probability an attack will hit.
 *
 * @param {number} evasion - The raw evasion value of the defending character.
 * @param {number} accuracy - The raw accuracy value of the attacking character.
 * @returns {number} The probability an attack will hit.
 */
export function calcHitRate(evasion: number, accuracy: number): number {
  let evadeRate = (evasion - 1) / ((2 * accuracy) + (evasion - 1));
  return 1 - evadeRate;
}

/**
 * Calculates the buffed sheet defense value.
 *
 * @param {number} defense - The unbuffed defense value on the character sheet.
 * @param {number} boost - The amount of defense +% stats provided by equipment.
 * @param {number} vitality - The vitality value of the character.
 * @param {number} strength - The strength value of the character.
 * @param {number} magic - The magic value of the character.
 * @param {'physical' | 'magical'} type - The type of damage.
 * @param {number} buffs - The amount of +% buffs on the character.
 */
export function calcBuffedDefense(defense: number,
                                  boost: number,
                                  vitality: number,
                                  strength: number,
                                  magic: number,
                                  type: 'physical' | 'magical',
                                  buffs: number): number {
  let equipmentDefense = calcEquipmentDefense(
                          defense,
                          boost,
                          vitality,
                          strength,
                          magic,
                          type
                        );

  let buffedEquipmentDefense = equipmentDefense * (1 + buffs);
  let stat = type === 'physical' ? strength : magic;

  return Math.round((vitality + stat - 2) / 4) +
         Math.round(buffedEquipmentDefense *
                   (1 + Math.round(((2 * vitality) + (3 * stat)) / 25) / 100)) +
        (type === 'physical' ? 1 : 0);
}
