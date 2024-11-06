import { useParams, Link } from 'react-router-dom';
import { getOneGame } from '../hooks/getOneGame';
import { useEffect, useState } from 'react';
import bjLogo from '../assets/images/bj-logo.png';
import userLogo from '../assets/images/user.svg';
import gameLogo from '../assets/images/game.svg';

export default function Game() {
  const { id } = useParams();
  const [game, setGame] = useState({});
  useEffect(() => {
    async function fetchGame() {
      const game = await getOneGame(id);
      if (game) {
        setGame(game);
      }
    }
    fetchGame();
  }, []);
  return (
    <div className="flex justify-center items-center w-full gap-10 flex-col">
      {game.length === 0 &&
        <div className="flex justify-center items-center w-full gap-4 flex-col">
          <h1 className="title">404</h1>
          <p className='font-semibold'>La partie demandée n'a pas été trouvée</p>
          <Link to="/" className="text-[#ffff00] duration-300">
              Retourner à l'accueil
          </Link>
        </div>
      }
      {game?.players?.length > 0 && (
        <>
          <div className="flex justify-center items-center w-full gap-2">
            <img className="w-[86px] h-[86px] mt-3" src={bjLogo} alt="logo" />
            <h1 className="title">BlackJack21</h1>
          </div>
          <div className="flex items-center gap-4 justify-center w-full bg-black/75 rounded-lg border-solid border border-white/20" key={game.id}>
            <img className="w-[28px] h-[28px]" src={userLogo} alt="logo" />
            <p>{game?.name}</p>
          <img className="w-[28px] h-[28px]" src={gameLogo} alt="logo" />
          <p>{game?.players?.map(player => player.name).join(', ')}</p>
          </div>
        </>
      )}
    </div>
  )
}