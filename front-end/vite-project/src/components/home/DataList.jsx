import { useEffect, useState } from "react";
import { getAllGames } from "../../hooks/getAllGames";
import { useNavigate } from "react-router-dom";
import gameLogo from '../../assets/images/game.svg';
import userLogo from '../../assets/images/user.svg';

export default function DataList() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchGames() {
      const games = await getAllGames();
      if (games) {
        setGames(games);
      }
    }
    fetchGames();
  }, []);

  function navigateToGame(id) {
    return () => navigate('/game/' + id);
  }

  return (
    <div className="flex items-center justify-center w-full flex-col gap-4">
      <h2>Liste des parties</h2>
      <div className="flex items-center justify-center w-full gap-2 flex-col">
        {games.length === 0 && <p>Aucune partie en cours</p>}
        {games.map((game) => (
          <button onClick={navigateToGame(game.id)} className="button-game p-0 flex items-center gap-4 justify-center w-full bg-black/75 rounded-lg border-solid border border-white/20" key={game.id}>
            <img className="w-[20px]" src={gameLogo} alt="logo" />
            <p>{game.name}</p>
            <img className="w-[20px]" src={userLogo} alt="logo" />
            <p className="font-bold">{game.players.map(player => player.name).join(', ')}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
