interface IMatch {
  id?: number,
  homeTeam: number,
  awayTeam: number
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export default IMatch;