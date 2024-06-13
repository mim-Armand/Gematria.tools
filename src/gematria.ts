interface GematriaStyle {
  [key: string]: number;
}

const hebrewStandard: GematriaStyle = {
  'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
  'י': 10, 'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60, 'ע': 70, 'פ': 80, 'צ': 90,
  'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400
};

const hebrewFull: GematriaStyle = {
  'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
  'י': 10, 'כ': 20, 'ך': 20, 'ל': 30, 'מ': 40, 'ם': 40, 'נ': 50, 'ן': 50, 'ס': 60,
  'ע': 70, 'פ': 80, 'ף': 80, 'צ': 90, 'ץ': 90, 'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400
};

const hebrewOrdinal: GematriaStyle = {
  'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
  'י': 10, 'כ': 11, 'ך': 11, 'ל': 12, 'מ': 13, 'ם': 13, 'נ': 14, 'ן': 14, 'ס': 15,
  'ע': 16, 'פ': 17, 'ף': 17, 'צ': 18, 'ץ': 18, 'ק': 19, 'ר': 20, 'ש': 21, 'ת': 22
};

const hebrewReduced: GematriaStyle = {
  'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
  'י': 1, 'כ': 2, 'ך': 2, 'ל': 3, 'מ': 4, 'ם': 4, 'נ': 5, 'ן': 5, 'ס': 6, 'ע': 7,
  'פ': 8, 'ף': 8, 'צ': 9, 'ץ': 9, 'ק': 1, 'ר': 2, 'ש': 3, 'ת': 4
};

const englishStandard: GematriaStyle = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18,
  'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26
};

const englishOrdinal: GematriaStyle = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18,
  'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26
};

const englishReduced: GematriaStyle = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
  'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
};

const defaultAlphabets: { [key: string]: { [style: string]: GematriaStyle } } = {
  hebrew: {
    standard: hebrewStandard,
    full: hebrewFull,
    ordinal: hebrewOrdinal,
    reduced: hebrewReduced
  },
  english: {
    standard: englishStandard,
    ordinal: englishOrdinal,
    reduced: englishReduced
  }
};

export class Gematria {
  static calculate(
    word: string,
    language?: string,
    style: 'standard' | 'ordinal' | 'reduced' | 'full' = 'standard',
    customAlphabet?: GematriaStyle
  ): number {
    const alphabet = this.getAlphabet(language, style, customAlphabet, word);
    let sum = 0;

    for (const char of word) {
      const upperChar = char.toUpperCase();
      if (alphabet[upperChar]) {
        sum += alphabet[upperChar];
      } else if (char.trim()) {
        throw new Error(`Invalid character '${char}' for ${language} language`);
      }
    }

    return sum;
  }

  static calculateSentence(
    sentence: string,
    defaultLanguage?: string,
    defaultStyle: 'standard' | 'ordinal' | 'reduced' | 'full' = 'standard',
    customAlphabet?: GematriaStyle
  ): number {
    const words = sentence.split(/\s+/);
    let total = 0;

    for (const word of words) {
      const detectedLanguage = this.detectLanguage(word) || defaultLanguage;
      if (!detectedLanguage) {
        throw new Error(`Language could not be detected for word '${word}' and no default language was provided`);
      }
      total += this.calculate(word, detectedLanguage, defaultStyle, customAlphabet);
    }

    return total;
  }

  private static detectLanguage(word: string): 'hebrew' | 'english' | null {
    if (/[\u0590-\u05FF]/.test(word)) {
      return 'hebrew';
    } else if (/[a-zA-Z]/.test(word)) {
      return 'english';
    } else {
      return null;
    }
  }

  private static getAlphabet(
    language?: string,
    style: string = 'standard',
    customAlphabet?: GematriaStyle,
    word?: string
  ): GematriaStyle {
    if (customAlphabet) {
      return customAlphabet;
    }

    if (!language) {
      const detectedLanguage = this.detectLanguage(word || '');
      if (!detectedLanguage) {
        throw new Error('Language could not be detected and no custom alphabet was provided');
      }
      language = detectedLanguage;
    }

    if (defaultAlphabets[language] && defaultAlphabets[language][style]) {
      return defaultAlphabets[language][style];
    }

    throw new Error(`Unsupported language '${language}' or style '${style}' and no custom alphabet was provided`);
  }
}
