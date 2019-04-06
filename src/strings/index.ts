export type Language = 'en' | 'sr'
export const languages: Language[] = ['en', 'sr']

type Translations = Record<Language, string>
type Strings = Record<string, Translations>

const strings: Strings = {
  'Play': {
    en: 'Play',
    sr: 'Играј',
  }
}

export default strings