import { httpService } from './http.service'

export const scoreService = {
  fetchScoreBoard,
  raisePoints,
  resetScores,

}

async function fetchScoreBoard() {
  return await httpService.get('score')
}
async function raisePoints(houseName, amount) {
  return await httpService.put('score', { houseName, amount })
}
async function resetScores() {
  return await httpService.put('score/reset-scores')
}


