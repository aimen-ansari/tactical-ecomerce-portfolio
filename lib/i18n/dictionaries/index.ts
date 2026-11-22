import type { Locale } from "../config";
import en, { type Dictionary } from "./en";
import de from "./de";
import fr from "./fr";

export const dictionaries: Record<Locale, Dictionary> = { en, de, fr };

export const getDictionary = (locale: Locale): Dictionary =>
  dictionaries[locale] ?? dictionaries.en;

export type { Dictionary };
