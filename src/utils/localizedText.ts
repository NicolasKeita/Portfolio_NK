
export function localizedText(lang: string, en?: string | null, fr?: string | null): string {
  return lang === 'en' && en ? en : (fr ?? '');
}