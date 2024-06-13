# Gematria.Tools

Gematria.Tools is a TypeScript library for calculating the Gematria of Hebrew and English words and strings.

## Installation

```sh
npm install gematria.tools
```

# Usage:

```js
import { Gematria } from "gematria.tools";

const hebrewWord = "אבג";
const englishWord = "GEMATRIA";

console.log(Gematria.calculate(hebrewWord, "hebrew"));
console.log(Gematria.calculate(englishWord, "english"));
```

> You can also look at the tests for different usage and APIs

# API

`Gematria.calculate(word: string, language: 'hebrew' | 'english'): number`
Calculates the Gematria of a single word.

`Gematria.calculateSentence(sentence: string, language: 'hebrew' | 'english'): number`
Calculates the Gematria of a sentence.

# Dev

```sh
npm run build
npm run test
npm publish
```
