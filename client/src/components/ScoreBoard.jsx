import React, { useState, useEffect } from 'react'

export default function ScoreBoard({score, user, game, gamemode}) {
  const [userStats, setUserStats] = useState(null);
  const [result, setResult] = useState(null);
  const [ownRecord, setOwnRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        if(game === "TimeAttack") {
          const loginnedUserData = {user : user, points : score};
          await fetch('http://localhost:3001/api/scoreboard/timeattack/' + gamemode + '', {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginnedUserData),
          })
          getUserStats()
        } else {
          const loginnedUserData = {user : user, points : score};
          await fetch('http://localhost:3001/api/scoreboard/quizz/' + gamemode + '', {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginnedUserData),
          })
          getUserStats()
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const getUserStats = async () => {
    try{
      if(game === "TimeAttack") {
        const getResponse = await fetch('http://localhost:3001/api/leaderboard/timeattack/' + gamemode + '');
        let getStats = await getResponse.json();
        const index = getStats.findIndex(x => x.PlayerName === user)
        getStats[index].Points = score;
        setUserStats(getStats);
      } else {
        const getResponse = await fetch('http://localhost:3001/api/leaderboard/quizz/' + gamemode + '');
        let getStats = await getResponse.json();
        const index = getStats.findIndex(x => x.PlayerName === user)
        getStats[index].Points = score;
        setUserStats(getStats);
      }
    }catch (err){console.log(err)}
  }

  useEffect(() => {
    if(userStats !== null){
      userStats.sort((a, b) => Number(b.Points) - Number(a.Points))
      const index = userStats.findIndex(x => x.PlayerName === user)
      setOwnRecord(index)
    }
    setResult(userStats);
  }, [userStats]);

  return (  
    (userStats !== null) &&
    <div className='scoreBoardContainer'>
        <div className='leaderBoard'><span>L E A D E R B O A R D</span></div>
        <span className='gameModeLabel'>
          Game Mode: {game}<br />
          <span>{game === "TimeAttack" ? "Limit: " + gamemode : "Difficulty: " + gamemode}</span>
        </span>
        <div className="displayScore">Your Score: {score}</div>
            {result && result.map((obj, id) => {
              if(id <= 2) {
                return (
                  <div className={user === obj.PlayerName ? "playerScoresRow playerScoreDivOwn" : "playerScoresRow playerScoreDiv"} key={'SBDiv_'+id}>
                      <span className={id === 0 ? "SB_trophy SB_trophyGold" : id === 1 ? "SB_trophy SB_trophySilver" : id === 2 ? "SB_trophy SB_trophyBronze" : "SB_trophyNothing"}></span>
                      <span className='SB_rank'>{'#'+ (id+1)}</span>
                      <span className='avatar'></span>
                      <span className='SB_player'>{obj.PlayerName}</span>
                      <span className='SB_score'>{obj.Points}</span>
                  </div>
                )
              }
              if(ownRecord && ownRecord > 2 && ownRecord === id) {
                return (
                  <React.Fragment key={id}>
                    <hr />
                    <div className={user === obj.PlayerName ? "playerScoresRowOwn playerScoresRow playerScoreDivOwn" : "playerScoresRowOwn playerScoresRow playerScoreDiv"} key={'SBDiv_'+id}>
                        <span className={id === 0 ? "SB_trophy SB_trophyGold" : id === 1 ? "SB_trophy SB_trophySilver" : id === 2 ? "SB_trophy SB_trophyBronze" : "SB_trophyNothing"}></span>
                        <span className='SB_rank'>{'#'+ (id+1)}</span>
                        <span className='avatar'></span>
                        <span className='SB_player'>{obj.PlayerName}</span>
                        <span className='SB_score'>{obj.Points}</span>
                    </div>
                  </React.Fragment>
                )
              }
            })}       
    </div>
  )
}
