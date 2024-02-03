'use client';

import { useState, useEffect } from 'react';
import {
  calcEquipmentDefense,
  calcReduction,
  calcEffectiveHealth,
  calcBuffedDefense
} from '../lib/calculator';
import { parse } from 'path';

export default function Home() {
  const [health, setHealth] = useState('');
  const [vitality, setVitality] = useState('');
  const [magic, setMagic] = useState('');
  const [strength, setStrength] = useState('');
  const [dexterity, setDexterity] = useState('');
  const [level, setLevel] = useState('');
  const [attackLevel, setAttackLevel] = useState('');
  const [accuracy, setAccuracy] = useState('');
  const [physicalDefense, setPhysicalDefense] = useState('');
  const [magicalDefense, setMagicalDefense] = useState('');
  const [evasion, setEvasion] = useState('');
  const [physicalDefenseBoost, setPhysicalDefenseBoost] = useState('');
  const [magicalDefenseBoost, setMagicalDefenseBoost] = useState('');
  const [physicalReduceDamage, setPhysicalReduceDamage] = useState('');
  const [magicalReduceDamage, setMagicalReduceDamage] = useState('');
  const [defenseLevel, setDefenseLevel] = useState('');
  const [physicalDefenseBuffs, setPhysicalDefenseBuffs] = useState('');
  const [magicalDefenseBuffs, setMagicalDefenseBuffs] = useState('');

  const [buffedPhysicalDefense, setBuffedPhysicalDefense] = useState(0);
  const [buffedMagicalDefense, setBuffedMagicalDefense] = useState(0);

  useEffect(() => {
    const handleInputChange = () => {
      let newBuffedPhysicalDefense: number = parseInt(physicalDefense);

      if (parseInt(physicalDefenseBuffs) > 0) {
        newBuffedPhysicalDefense = calcBuffedDefense(
          parseInt(physicalDefense),
          parseInt(physicalDefenseBoost) / 100.0,
          parseInt(vitality),
          parseInt(strength),
          parseInt(magic),
          'physical',
          parseInt(physicalDefenseBuffs) / 100.0
        );
      }

      let newBuffedMagicalDefense: number = parseInt(magicalDefense);

      if (parseInt(magicalDefenseBuffs) > 0) {
        newBuffedMagicalDefense = calcBuffedDefense(
          parseInt(magicalDefense),
          parseInt(magicalDefenseBoost) / 100.0,
          parseInt(vitality),
          parseInt(strength),
          parseInt(magic),
          'magical',
          parseInt(magicalDefenseBuffs) / 100.0
        );
      }

      setBuffedPhysicalDefense(newBuffedPhysicalDefense);
      setBuffedMagicalDefense(newBuffedMagicalDefense);
    }

    handleInputChange();
  }, [
    physicalDefense,
    magicalDefense,
    physicalDefenseBoost,
    magicalDefenseBoost,
    vitality,
    strength,
    magic,
    physicalDefenseBuffs,
    magicalDefenseBuffs
  ]);

  return (
    <main className="flex justify-center items-center bg-gray-100 pt-10 pb-10">

      <div className="flex gap-10 items-start">

        <form className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
          <p className="mb-5 text-3xl uppercase text-gray-600">Defending Character</p>

          <label>Health</label>
          <input
            type="number"
            name="health"
            placeholder="Health"
            min="0"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            value={health}
            onChange={(e) => setHealth(e.target.value)}
          />

          <label>Vitality</label>
          <input
            type="number"
            name="vitality"
            placeholder="Vitality"
            min="0"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            value={vitality}
            onChange={(e) => setVitality(e.target.value)}
          />

          <label>Magic</label>
          <input
            type="number"
            name="magic"
            placeholder="Magic"
            min="0"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            value={magic}
            onChange={(e) => setMagic(e.target.value)}
          />

          <label>Strength</label>
          <input
            type="number"
            name="strength"
            placeholder="Strength"
            min="0"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            value={strength}
            onChange={(e) => setStrength(e.target.value)}
          />

          <label>Dexterity</label>
          <input
            type="number"
            name="dexterity"
            placeholder="Dexterity"
            min="0"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            value={dexterity}
            onChange={(e) => setDexterity(e.target.value)}
          />

          <label>Reduce physical damage taken +%</label>

          <input
              type="number"
              name="physicalReduceDamage"
              placeholder="Reduce physical damage taken +%"
              min="0"
              className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
              autoComplete="off"
              value={physicalReduceDamage}
              onChange={(e) => setPhysicalReduceDamage(e.target.value)}
            />

          <label>Physical Defense +%</label>

          <input
              type="number"
              name="physicalDefenseBoost"
              placeholder="Physical Defense +%"
              min="0"
              className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
              autoComplete="off"
              value={physicalDefenseBoost}
              onChange={(e) => setPhysicalDefenseBoost(e.target.value)}
            />

          <div className="flex flex-col mb-5 relative">
            <label>Physical Defense</label>

            <input
              type="number"
              name="physicalDefense"
              placeholder="Physical Defense"
              min="0"
              className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
              autoComplete="off"
              value={physicalDefense}
              onChange={(e) => setPhysicalDefense(e.target.value)}
            />

            <p className="text-xs -mt-3 text-gray-500">
              Equipment Value: {calcEquipmentDefense(parseInt(physicalDefense),
                                                     parseInt(physicalDefenseBoost) / 100.0,
                                                     parseInt(vitality),
                                                     parseInt(strength),
                                                     parseInt(magic),
                                                     'physical')}
            </p>
          </div>

          <div className="flex flex-col mb-5 relative">
            <label>Physical Defense Buffs +%</label>

            <input
              type="number"
              name="physicalDefenseBuffs"
              placeholder="Physical Defense Buffs +%"
              min="0"
              className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
              autoComplete="off"
              value={physicalDefenseBuffs}
              onChange={(e) => setPhysicalDefenseBuffs(e.target.value)}
            />

            <p className="text-xs -mt-3 text-gray-500">
              Buffed Defense: {buffedPhysicalDefense}
            </p>
          </div>

          <label>Reduce magical damage taken +%</label>

          <input
              type="number"
              name="magicalReduceDamage"
              placeholder="Reduce magical damage taken +%"
              min="0"
              className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
              autoComplete="off"
              value={magicalReduceDamage}
              onChange={(e) => setMagicalReduceDamage(e.target.value)}
            />

          <label>Magical Defense +%</label>

          <input
              type="number"
              name="magicalDefenseBoost"
              placeholder="Magical Defense +%"
              min="0"
              className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
              autoComplete="off"
              value={magicalDefenseBoost}
              onChange={(e) => setMagicalDefenseBoost(e.target.value)}
            />

          <div className="flex flex-col mb-5 relative">
            <label>Magical Defense</label>

            <input
              type="number"
              name="magicalDefense"
              placeholder="Magical Defense"
              min="0"
              className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
              autoComplete="off"
              value={magicalDefense}
              onChange={(e) => setMagicalDefense(e.target.value)}
            />

            <p className="text-xs -mt-3 text-gray-500">
              Equipment Value: {calcEquipmentDefense(parseInt(magicalDefense),
                                                     parseInt(magicalDefenseBoost) / 100.0,
                                                     parseInt(vitality),
                                                     parseInt(strength),
                                                     parseInt(magic),
                                                     'magical')}
            </p>
          </div>

          <div className="flex flex-col mb-5 relative">
            <label>Magical Defense Buffs +%</label>

            <input
              type="number"
              name="magicalDefenseBuffs"
              placeholder="Magical Defense Buffs +%"
              min="0"
              className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
              autoComplete="off"
              value={magicalDefenseBuffs}
              onChange={(e) => setMagicalDefenseBuffs(e.target.value)}
            />

            <p className="text-xs -mt-3 text-gray-500">
              Buffed Defense: {buffedMagicalDefense}
            </p>
          </div>

          <input
            type="number"
            name="defenseLevel"
            placeholder="Defense Level"
            min="0"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            value={defenseLevel}
            onChange={(e) => setDefenseLevel(e.target.value)}
          />


          <label>Evasion</label>
          <input
            type="number"
            name="evasion"
            placeholder="Evasion"
            min="0"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            value={evasion}
            onChange={(e) => setEvasion(e.target.value)}
          />
        </form>

        <form className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
          <p className="mb-5 text-3xl uppercase text-gray-600">Attacking Character</p>

          <label>Level</label>
          <input
            type="number"
            name="level"
            placeholder="Level"
            min="0"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />

          <label>Attack Level</label>
          <input
            type="number"
            name="attackLevel"
            placeholder="Attack Level"
            min="0"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            value={attackLevel}
            onChange={(e) => setAttackLevel(e.target.value)}
          />

          <label>Accuracy</label>
          <input
            type="number"
            name="accuracy"
            placeholder="Accuracy"
            min="0"
            className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            value={accuracy}
            onChange={(e) => setAccuracy(e.target.value)}
          />

        </form>

        <form className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
          <p>Physical damage from level <strong>{level}</strong> enemies will be reduced by <strong>{(calcReduction(buffedPhysicalDefense, parseInt(level)) * 100).toFixed(2)}%</strong></p>
          <p>Magical damage from level <strong>{level}</strong> enemies will be reduced by <strong>{(calcReduction(buffedMagicalDefense, parseInt(level)) * 100).toFixed(2)}%</strong></p>
          <p>Physical Effective HP = <strong>{calcEffectiveHealth(
            parseInt(health),
            parseInt(level),
            buffedPhysicalDefense,
            parseInt(physicalReduceDamage) / 100.0,
            parseInt(defenseLevel),
            parseInt(attackLevel)
          )}</strong></p>
          <p>Magical Effective HP = <strong>{calcEffectiveHealth(
            parseInt(health),
            parseInt(level),
            buffedMagicalDefense,
            parseInt(magicalReduceDamage) / 100.0,
            parseInt(defenseLevel),
            parseInt(attackLevel)
          )}</strong></p>
        </form>

      </div>

    </main>
  );
}
