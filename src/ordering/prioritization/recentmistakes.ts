import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  function mostRecentAnswerWasWrong (cardStatus: CardStatus): boolean {
    const results = cardStatus.getResults()
    if (results.length === 0) return false
    return !results[results.length - 1]
  }

  return {
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const wrong: CardStatus[] = []
      const correct: CardStatus[] = []
      for (const card of cards) {
        if (mostRecentAnswerWasWrong(card)) {
          wrong.push(card)
        } else {
          correct.push(card)
        }
      }
      return [...wrong, ...correct]
    }
  }
}

export { newRecentMistakesFirstSorter }