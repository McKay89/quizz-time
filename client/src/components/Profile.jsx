import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"

const difficultyModes = [
  "easy",
  "normal",
  "hard",
  "default"
]

const timeAttackFrames = [
  30,
  60,
  90,
  120,
  150,
  180
]

// Multifetch with filtered return property value
const fetchScores = async (username) => {
  const allScores = await Promise.all(difficultyModes.map(async (difficulty) => {
    return {
      difficulty,
      scores: (await fetch(`http://localhost:3001/api/leaderboard/quizz/${difficulty}`).then(response => response.json())).filter(score => score.PlayerName === username),
    };
  }));
  return allScores;
};

const fetchTimeAttackScores = async (username) => {
  const allScores = await Promise.all(timeAttackFrames.map(async (frame) => {
    return {
      frame,
      scores: (await fetch(`http://localhost:3001/api/leaderboard/timeattack/${frame}`).then(response => response.json())).filter(score => score.PlayerName === username),
    };
  }));
  return allScores;
};


export default function Profile({user}) {

  const navigate = useNavigate();

  const [backToMainMenu, setBackToMainMenu] = useState(false);
  const [diffUserScores, setDiffUserScores] = useState([]);
  const [timeAttackUserScores, setTimeAttackUserScores] = useState(null);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const fetchedUserScores = await fetchScores(user);
        const fetchedTAUserScores = await fetchTimeAttackScores(user);
        setDiffUserScores(fetchedUserScores)
        setTimeAttackUserScores(fetchedTAUserScores)
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchHandler();
  }, [user]);

  const handlerBackToMainMenu = () => {
    setBackToMainMenu(true)
    setTimeout(() => {
      navigate(-1)
    }, 500)
  }

  //  <span onClick={handleEdit} className="input-group-text btn btn-dark"><i className="bi bi-pencil-square"></i></span>
  return (
    <div className="windowContainer container" style={{filter : "hue-rotate(320deg)"}}>
      <AnimatePresence> {/* If the rendered element or component is gone stop and unmount animation*/}
        <motion.div className='container contentWindow' initial={{ scale: 0, opacity: 0}} animate={backToMainMenu ? {scale: 0} : {scale: 1, opacity:1}} transition={{duration: 0.5}}>
        <button className="btn btn-x btn-light" onClick={handlerBackToMainMenu}><i className="bi bi-x-lg"></i></button>
        <h1 className='optionHeader'>Profile</h1>

        <table className="table table-warning table-sm">
            <thead>
            <tr><th colSpan={6}><h3>Quiz mode</h3></th></tr>
              <tr>
                <th scope="col">Easy</th>
                <th scope="col">Normal</th>
                <th scope="col">Hard</th>
                <th scope="col">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {diffUserScores &&
                    diffUserScores.find(diff => diff.difficulty === 'easy')?.scores.map(score => (
                      <div key={score._id}>{score.Points}</div>
                    ))}
                </td>
                <td>
                  {diffUserScores &&
                    diffUserScores.find(diff => diff.difficulty === 'normal')?.scores.map(score => (
                      <div key={score._id}>{score.Points}</div>
                    ))}
                </td>
                <td>
                  {diffUserScores &&
                    diffUserScores.find(diff => diff.difficulty === 'hard')?.scores.map(score => (
                      <div key={score._id}>{score.Points}</div>
                    ))}
                </td>
                <td>
                  {diffUserScores &&
                    diffUserScores.find(diff => diff.difficulty === 'default')?.scores.map(score => (
                      <div key={score._id}>{score.Points}</div>
                    ))}
                </td>
              </tr>
            </tbody>
          </table>



          <table className="table table-warning table-sm">
            <thead>
              <tr><th colSpan={6}><h3>TimeAttack mode</h3></th></tr>
              <tr>
                <th scope="col">30 sec</th>
                <th scope="col">60 sec</th>
                <th scope="col">90 sec</th>
                <th scope="col">120 sec</th>
                <th scope="col">150 sec</th>
                <th scope="col">180 sec</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                  {timeAttackUserScores &&
                    timeAttackUserScores.find(diff => diff.frame === 30)?.scores.map(score => (
                      <div key={score._id}>{score.Points}</div>
                    ))}
                </td>
                <td>
                  {timeAttackUserScores &&
                    timeAttackUserScores.find(diff => diff.frame === 60)?.scores.map(score => (
                      <div key={score._id}>{score.Points}</div>
                    ))}
                </td>
                <td>
                  {timeAttackUserScores &&
                    timeAttackUserScores.find(diff => diff.frame === 90)?.scores.map(score => (
                      <div key={score._id}>{score.Points}</div>
                    ))}
                </td>
                <td>
                  {timeAttackUserScores &&
                    timeAttackUserScores.find(diff => diff.frame === 120)?.scores.map(score => (
                      <div key={score._id}>{score.Points}</div>
                    ))}
                </td>
                <td>
                  {timeAttackUserScores &&
                    timeAttackUserScores.find(diff => diff.frame === 150)?.scores.map(score => (
                      <div key={score._id}>{score.Points}</div>
                    ))}
                </td>
                <td>
                  {timeAttackUserScores &&
                    timeAttackUserScores.find(diff => diff.frame === 180)?.scores.map(score => (
                      <div key={score._id}>{score.Points}</div>
                    ))}
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
