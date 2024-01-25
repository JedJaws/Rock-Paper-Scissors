import { useState, useEffect} from 'react';


export default function GamePage({pScore, oScore, updateNumbers}) {

    const moveKey = { 
        rock: "scissors", 
        scissors: "paper", 
        paper: "rock"
    }

    const images = {
        scissors: "https://cdn.pixabay.com/photo/2016/03/31/23/11/scissors-1297454__340.png", 
        paper: "https://cdn.pixabay.com/photo/2014/12/21/23/56/papers-576385_1280.png", 
        rock: "https://i.pinimg.com/originals/4d/40/db/4d40dbef4879e329e9e9309ca3320470.png"
    }

    const [pImg, setPImg] = useState(images.rock);
    const [oImg, setOImg] = useState(images.rock);
    const [playerScore, setPlayerScore] = useState(pScore);
    const [enemyScore, setEnemyScore] = useState(oScore);

    useEffect(()=>{
        updateNumbers(playerScore, enemyScore);
    },[playerScore, enemyScore])


    function RandomizeEnemyMove() {
        let choices = Object.keys(moveKey);

        return choices[Math.floor(Math.random() * choices.length)];
    }

    function Logic(playerMove) {
        // Generating the enemy's move and updating the picture to display its correct move
        const enemyMove = RandomizeEnemyMove();
        console.log("Opponent's Move: ", enemyMove);
        setPImg(images[enemyMove]);
        setOImg(images[playerMove]);

        if(moveKey[playerMove] === enemyMove) {
            console.log("opponent won!");
            setEnemyScore((previousScore) => previousScore+1);
        } else if(moveKey[enemyMove] === playerMove) {
            console.log("player won!");
            setPlayerScore((previousScore) => previousScore+1);
        } else {
            console.log("tie!");
        }
    }

    function restart() {
        setPlayerScore(0);
        setEnemyScore(0);
    }

    return ( 
        <main>
            <div className="flex justify-center items-center p-10">
                <div className="pb-10 flex justify-center items-center flex-col">
                    <h1 className="p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10"> You: {playerScore} </h1>
                    <img className='w-20 h-20' src={pImg} alt="the current move the player played" />
                </div>
                <div className="pb-10 flex justify-center items-center flex-col">
                    <h1 className="p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10" > Opponent: {enemyScore} </h1>
                    <img className='w-20 h-20' src={oImg} alt="the current move the opponent played" />
                </div>
            </div>
            <div>
                <button onClick={()=>{Logic("rock")}} className="text-center text-black hover:outline hover:bg-red-700 p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10">🗿</button>
                <button onClick={()=>{Logic("paper")}} className="text-center text-black hover:outline hover:bg-red-700 p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10">📃</button>
                <button onClick={()=>{Logic("scissors")}} className="text-center text-black hover:outline hover:bg-red-700 p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10">🔪</button>
            </div>
            <button onClick={()=>{restart()}} className="text-center text-black hover:outline hover:bg-red-700 p-2 text-black text-5xl md:text-3xl sm:text-xl my-3 mb-10">RESTART</button>
        </main>

    );
}