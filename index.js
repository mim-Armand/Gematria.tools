const hebrewGematriaMap = {
  'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
  'י': 10, 'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60, 'ע': 70, 'פ': 80,
  'צ': 90, 'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400, 'ך': 20, 'ם': 40,
  'ן': 50, 'ף': 80, 'ץ': 90
};

const englishGematriaMap = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 10, 'K': 20, 'L': 30, 'M': 40, 'N': 50, 'O': 60, 'P': 70, 'Q': 80,
  'R': 90, 'S': 100, 'T': 200, 'U': 300, 'V': 400, 'W': 500, 'X': 600,
  'Y': 700, 'Z': 800
};

const simpleGematriaMap = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17,
  'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25,
  'Z': 26
};

function calculateGematria(text, type) {
  let total = 0;
  let map;

  if (type === 'hebrew') {
    map = hebrewGematriaMap;
  } else if (type === 'english') {
    map = englishGematriaMap;
  } else if (type === 'simple') {
    map = simpleGematriaMap;
  } else {
    throw new Error('Unsupported Gematria type. Use "hebrew", "english", or "simple".');
  }

  for (let char of text.toUpperCase()) {
    if (map[char] !== undefined) {
      total += map[char];
    }
  }

  return total;
}

// Example usage:
console.log(calculateGematria('חשך', 'hebrew'));  // Hebrew Gematria
console.log(calculateGematria('darkness', 'english'));  // English Gematria
console.log(calculateGematria('darkness', 'simple'));  // Simple Gematria
