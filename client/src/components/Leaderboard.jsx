import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
    const navigate = useNavigate();
    const [timeAttackModes, setTimeAttackModes] = useState("");
    const [quizzModes, setQuizzModes] = useState("");

    const handlerBackToMainMenu = () => {      
        navigate(-1);    
    };

    const handleTimeAttackChange = (limit) => {
        const fetchData = async(limit) => {
            try{
                const res = await fetch(`http://localhost:3001/api/leaderboard/timeattack/${limit}`);
                const data = await res.json();
                setTimeAttackModes(data.sort((a,b) => b.Points - a.Points));
            }catch(err){
                console.log(err);
            }
        }
        fetchData(limit);
    }

    const handleQuizChange = (difficulty) => {
        const fetchData = async(difficulty) => {
            try{
                const res = await fetch(`http://localhost:3001/api/leaderboard/quizz/${difficulty}`);
                const data = await res.json();
                setQuizzModes(data.sort((a,b) => b.Points - a.Points));
            }catch(err){
                console.log(err);
            }
        }
        fetchData(difficulty);
    }

    return (
        <div className="leaderboardContainer">
            <div className="backToMainMenu" onClick={handlerBackToMainMenu}><i className="fa-solid fa-xmark"></i></div>
                <div className="timeAttackLBContainer">
                    <span>Time Attack</span><br/>
                    <select onChange={(e) => handleTimeAttackChange(e.target.value)}>
                        <option hidden >Choose</option>
                        <option value={30}>TimeAttack 30</option>
                        <option value={60}>TimeAttack 60</option>
                        <option value={90}>TimeAttack 90</option>
                        <option value={120}>TimeAttack 120</option>
                        <option value={150}>TimeAttack 150</option>
                        <option value={180}>TimeAttack 180</option>
                    </select>
                    <div className="timeAttackLBRow">
                        <div className="row timeAttackTr">
                            {timeAttackModes && timeAttackModes.map((obj,id) =>                             
                                <div className="playerScoreDiv playerScoresRow" key={'SBDiv_'+id} style={{ width: "400px" }}>
                                    <span className={id === 0 ? "SB_trophy SB_trophyGold" : id === 1 ? "SB_trophy SB_trophySilver" : id === 2 ? "SB_trophy SB_trophyBronze" : "SB_trophyNothing"}></span>
                                    <span className='SB_rank'>{'#'+ (id+1)}</span>
                                    <span className='avatar'></span>
                                    <span className='SB_player'>{obj.PlayerName}</span>
                                    <span className='SB_score'>{obj.Points}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            <div className="timeAttackQContainer">
                <span>QuizZ</span><br/>
                <select onChange={(e) => handleQuizChange(e.target.value)}>
                        <option hidden >Choose</option>
                        <option value={"default"}>Default</option>
                        <option value={"easy"}>Easy</option>
                        <option value={"normal"}>Normal</option>
                        <option value={"hard"}>Hard</option>
                </select>
                <div className="timeAttackLBRow">
                    <div className="row qizzTr">  
                        {quizzModes && quizzModes.map((obj,id) =>                             
                            <div className="playerScoreDiv playerScoresRow" key={'SBDiv_'+id} style={{ width: "400px" }}>
                                <span className={id === 0 ? "SB_trophy SB_trophyGold" : id === 1 ? "SB_trophy SB_trophySilver" : id === 2 ? "SB_trophy SB_trophyBronze" : "SB_trophyNothing"}></span>
                                <span className='SB_rank'>{'#'+ (id+1)}</span>
                                <span className='avatar'></span>
                                <span className='SB_player'>{obj.PlayerName}</span>
                                <span className='SB_score'>{obj.Points}</span>
                            </div>
                        )}
                    </div>                    
                </div>
            </div>
        </div>
    );
}
 
export default Leaderboard;