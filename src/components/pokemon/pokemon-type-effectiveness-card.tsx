import React from "react";
import { TypeApiResponse } from "@/lib/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypeBadge } from "../ui/badge";

interface EffectivenessMap {
  [key: string]: number;
}

function calculateTypeEffectiveness(types: TypeApiResponse[]): {
  weaknesses: EffectivenessMap;
  resistances: EffectivenessMap;
  immunities: string[];
} {
  const weaknesses: EffectivenessMap = {};
  const resistances: EffectivenessMap = {};
  const immunities: string[] = [];

  types.forEach((type) => {
    type.damage_relations.double_damage_from.forEach((relation) => {
      weaknesses[relation.name] = (weaknesses[relation.name] || 1) * 2;
    });

    type.damage_relations.half_damage_from.forEach((relation) => {
      resistances[relation.name] = (resistances[relation.name] || 1) * 0.5;
    });

    type.damage_relations.no_damage_from.forEach((relation) => {
      immunities.push(relation.name);
    });
  });

  Object.keys(weaknesses).forEach((type) => {
    if (resistances[type]) {
      const effectiveness = weaknesses[type] * resistances[type];
      if (effectiveness === 1) {
        delete weaknesses[type];
        delete resistances[type];
      } else if (effectiveness > 1) {
        weaknesses[type] = effectiveness;
        delete resistances[type];
      } else {
        resistances[type] = effectiveness;
        delete weaknesses[type];
      }
    }
  });

  immunities.forEach((type) => {
    delete weaknesses[type];
    delete resistances[type];
  });

  return { weaknesses, resistances, immunities };
}

function EffectivenessSection({
  title,
  types,
  effectiveness,
}: {
  title: string;
  types: string[];
  effectiveness?: number;
}) {
  if (!types.length) return null;

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        {title}
        {effectiveness && (
          <span className="text-xs text-muted-foreground">
            ({effectiveness}×)
          </span>
        )}
      </h3>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </div>
  );
}

export function PokemonTypeEffectiveness({
  types,
}: {
  types: TypeApiResponse[];
}) {
  const { weaknesses, resistances, immunities } =
    calculateTypeEffectiveness(types);

  const normalWeaknesses = Object.entries(weaknesses)
    .filter(([, value]) => value === 2)
    .map(([type]) => type);

  const doubleWeaknesses = Object.entries(weaknesses)
    .filter(([, value]) => value === 4)
    .map(([type]) => type);

  const normalResistances = Object.entries(resistances)
    .filter(([, value]) => value === 0.5)
    .map(([type]) => type);

  const doubleResistances = Object.entries(resistances)
    .filter(([, value]) => value === 0.25)
    .map(([type]) => type);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          Type Effectiveness
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Pokemon's types */}
          <div>
            <h3 className="font-medium mb-2">Types:</h3>
            <div className="flex gap-2">
              {types.map((type) => (
                <TypeBadge key={type.id} type={type.name} />
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Weaknesses */}
            <div>
              <h3 className="font-medium mb-3">Weaknesses</h3>
              <div className="space-y-3">
                {doubleWeaknesses.length > 0 && (
                  <EffectivenessSection
                    title="Takes 4× damage from"
                    types={doubleWeaknesses}
                    effectiveness={4}
                  />
                )}
                {normalWeaknesses.length > 0 && (
                  <EffectivenessSection
                    title="Takes 2× damage from"
                    types={normalWeaknesses}
                    effectiveness={2}
                  />
                )}
                {!doubleWeaknesses.length && !normalWeaknesses.length && (
                  <p className="text-sm text-muted-foreground">No weaknesses</p>
                )}
              </div>
            </div>

            {/* Resistances and Immunities */}
            <div>
              <h3 className="font-medium mb-3">Resistances</h3>
              <div className="space-y-3">
                {doubleResistances.length > 0 && (
                  <EffectivenessSection
                    title="Takes ¼× damage from"
                    types={doubleResistances}
                    effectiveness={0.25}
                  />
                )}
                {normalResistances.length > 0 && (
                  <EffectivenessSection
                    title="Takes ½× damage from"
                    types={normalResistances}
                    effectiveness={0.5}
                  />
                )}
                {immunities.length > 0 && (
                  <EffectivenessSection
                    title="Takes 0× damage from"
                    types={immunities}
                    effectiveness={0}
                  />
                )}
                {!doubleResistances.length &&
                  !normalResistances.length &&
                  !immunities.length && (
                    <p className="text-sm text-muted-foreground">
                      No resistances
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
