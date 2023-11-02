import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState} from 'react'
import { motion, AnimatePresence } from "framer-motion"

export default function Info() {

  const navigate = useNavigate();

  const [backToMainMenu, setBackToMainMenu] = useState(false);

  const handlerBackToMainMenu = () => {
    setBackToMainMenu(true)
    setTimeout(() => {
      navigate(-1)
    }, 500)
  }
  
  return (
    <div className="windowContainer container" style={{filter : "hue-rotate(60deg)"}}>
      <AnimatePresence> {/* If the rendered element or component is gone stop and unmount animation*/}
        <motion.div className='container contentWindow' initial={{ scale: 0, opacity: 0}} animate={backToMainMenu ? {scale: 0} : {scale: 1, opacity:1}} transition={{duration: 0.5}}>
          <button className="btn btn-x btn-light" onClick={handlerBackToMainMenu}><i className="bi bi-x-lg"></i></button>
          <h1 className='optionHeader'>About</h1>
          <div className='infoBox'>
            <span><b>Application:</b>&nbsp;&nbsp; QuizTime</span><br />
            <span><b>Version:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.2 (build: R091)</span><br />
            <span><b>Developers:</b>&nbsp;&nbsp;&nbsp; McKay89, HanSolo, Norbi, Robi</span><br /><br />
            <span><b>ChangeLog:</b>&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://mckay-projects.com/quiztime/changelog.txt" target='_blank'><i className="downloadIcon fa-solid fa-download"></i></a></span><br /><hr />
            <span style={{color: '#4DF'}}><b>Game Modes</b></span>
            <div className='infoGameModesTimeAttack'>
              <span style={{color: '#F51'}}><b><u>Time Attack</u></b></span><br />
              <p>
                Do you feel like you know everything and you can't be blamed? It's time to try it yourself! In this game mode,
                you have the opportunity to test your knowledge within the time limit of your choice. If you get stuck, you won't be alone!
              </p>
            </div>
            <div className='infoGameModesQuiz'>
              <span style={{color: '#F51'}}><b><u>QuizZ</u></b></span><br />
              <p>
              In this game mode, you can play without a time limit, but you can farm from 3 lives. If you run out of lives, it's game over.
              </p>
            </div>
            <div className='infoGameModesHardcore'>
              <span style={{color: '#F51'}}><b><u>Multiplayer</u></b></span><br />
              <p>
                Future planned feature...
              </p>
            </div>
            <hr/>
            <span style={{color: '#4DF'}}><b>Plans</b></span>
            <div className='infoGameModesHardcore'>
              <span style={{color: '#F51'}}><b><u>Leveling System</u></b></span><br />
              <p>
                Future planned feature...
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
