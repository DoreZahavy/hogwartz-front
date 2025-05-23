import { httpService } from './http.service'

export const scoreService = {
  fetchScoreBoard,
  raisePoints,
  resetScores,
  downloadCSV

}

const BASE_URL = 'score'

async function fetchScoreBoard() {
  return await httpService.get(BASE_URL)
}
async function raisePoints(houseName, amount) {
  return await httpService.put(BASE_URL, { houseName, amount })
}
async function resetScores() {
  return await httpService.put(BASE_URL + '/reset-scores')
}

async function downloadCSV() {
  return await httpService.get(BASE_URL + '/csv', {
    responseType: 'blob'
  })
}

