import { useCreateGame } from "../hooks/useCreateGame";
import { useState } from "react";
import '../assets/styles/home.scss';
import DataList from "../components/home/DataList";
import bjLogo from '../assets/images/bj-logo.png';
import userLogo from '../assets/images/user.svg';
import gameLogo from '../assets/images/game.svg';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [game, setGame] = useState("");
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  async function navigateToGame(game, players) {
    try {
      const response = await useCreateGame(game, players);
      navigate('/game/' + response.id);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center w-full gap-10 flex-col">
        <div className="flex justify-center items-center w-full gap-2">
          <img className="w-[86px] h-[86px] mt-3" src={bjLogo} alt="logo" />
          <h1 className="title">BlackJack21</h1>
        </div>
        <div className="flex justify-center items-center w-full gap-4 flex-col">
          <h2>Nom de la partie</h2>
          <div className={`case${game.length >= 50 ? ' max-length' : ''}`}>
            <img className="w-[28px] h-[28px]" src={gameLogo} alt="logo" />
            <input maxLength="50" type="text" id="game" name="game" value={game} onChange={(e) => setGame(e.target.value)} placeholder="Saisissez le nom de la partie" />
          </div>
          <h2>Ajouter des joueurs</h2>
          <div className={`case${players.length > 0 && players[players.length - 1].length >= 50 ? ' max-length' : ''}`}>
            <img className="w-[28px] h-[28px]" src={userLogo} alt="logo" />
            <input maxLength={players.length > 0 ? players.length * 50 : 50} type="text" id="player" name="player" value={players.join(',')} onChange={(e) => setPlayers(e.target.value.split(','))} placeholder="Séparez les joueurs par une virgule" />
          </div>
          {players.length > 0 && players[players.length - 1].length >= 50 && (
            <div className="tooltip">
              Limite de caractère atteint sur le dernier joueur
            </div>
          )}
          <button className="mt-4 w-full" onClick={() => navigateToGame(game, players)}>Créer une partie</button>
        </div>
        <DataList />
      </div>
    </>
  );
}