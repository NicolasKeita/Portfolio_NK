import ui from './locales/ui.yaml';
import skills from './locales/skills.yaml';
import education from './locales/education.yaml';
import contact from './locales/contact.yaml';
import projects from './locales/projects';

export type Lang = 'fr' | 'en';

export type TranslationData = Record<string, unknown>;

function mergeTranslationData(target: TranslationData, source: TranslationData): TranslationData {
  for (const [key, value] of Object.entries(source)) {
    const existing = target[key];
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      existing &&
      typeof existing === 'object' &&
      !Array.isArray(existing)
    ) {
      mergeTranslationData(existing as TranslationData, value as TranslationData);
    } else {
      target[key] = value;
    }
  }
  return target;
}

const rawData: TranslationData = {};
for (const chunk of [ui, skills, education, contact, projects] as TranslationData[]) {
  mergeTranslationData(rawData, chunk);
}

/** Raw parsed YAML data */
const store = rawData as TranslationData;

function resolveLanguageNode(value: unknown, lang: Lang): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => resolveLanguageNode(item, lang));
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;

    if (record.fr !== undefined && record.en !== undefined) {
      return record[lang];
    }

    const resolved: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(record)) {
      resolved[key] = resolveLanguageNode(child, lang);
    }
    return resolved;
  }

  return value;
}

export const locales: Record<Lang, TranslationData> = {
  fr: resolveLanguageNode(rawData, 'fr') as TranslationData,
  en: resolveLanguageNode(rawData, 'en') as TranslationData,
};

/**
 * Retrieves a value from an object using dot-notation.
 */
export function getNested(obj: TranslationData, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || typeof current !== 'object') return undefined;
    current = (current as TranslationData)[key];
  }
  return current;
}

/**
 * Resolves a { fr: '...', en: '...' } block into a string for the selected language.
 * If the value is already a string, it returns it directly.
 */
function localizedValue(val: unknown, lang: Lang): string {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object') {
    const v = val as Record<string, unknown>;
    const s = v[lang];
    if (typeof s === 'string') return s;
    const fallback = lang === 'fr' ? v.en : v.fr;
    if (typeof fallback === 'string') return fallback;
  }
  return '';
}

/**
 * Returns a translated string from a dot-path key.
 * Automatically resolves { fr, en } blocks.
 */
export function t(lang: Lang, key: string): string {
  const val = getNested(store, key);
  return localizedValue(val, lang);
}
