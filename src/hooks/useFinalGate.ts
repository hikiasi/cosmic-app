import { useEffect } from 'react'

interface UseFinalGateOptions {
  totalMemories: number
  visitedMemories: number
  totalQualities: number
  visitedQualities: number
  requiredHearts: number
  foundHearts: number
  onOpen: () => void
  alreadyOpened?: boolean
}

export function useFinalGate({ totalMemories, visitedMemories, totalQualities, visitedQualities, requiredHearts, foundHearts, onOpen, alreadyOpened = false }: UseFinalGateOptions) {
  useEffect(() => {
    const allVisited = visitedMemories >= totalMemories && visitedQualities >= totalQualities
    const heartsOk = foundHearts >= requiredHearts
    if (allVisited && heartsOk && !alreadyOpened) onOpen()
  }, [totalMemories, visitedMemories, totalQualities, visitedQualities, requiredHearts, foundHearts, onOpen, alreadyOpened])
}


