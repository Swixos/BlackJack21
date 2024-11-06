import PlayerRow from './PlayerRow';

export default function PlayerTable({ players }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Joueur</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <PlayerRow key={player.id} player={player} />
        ))}
      </tbody>
    </table>
  );
};