import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"
import Modal from 'react-modal';
import { processServerResponse } from "../../utils";
import { useAuthContext } from "../Auth/AuthContext";

Modal.setAppElement('#root');

const endpoint = `${import.meta.env.VITE_API_URL}/boardgames`;

export function BoardgameDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id: boardgameId } = useParams();
  const [game, setGame] = useState(null);
  const { user, accessToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function getBoardgame() {
      const data = await fetch(`${endpoint}/${boardgameId}`).then(processServerResponse);
      setGame(data);
    }

    getBoardgame();
  }, [boardgameId]);

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  async function handleDeleteGame() {
    await fetch(`${endpoint}/${boardgameId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    navigate('/boardgames')
    handleCloseModal();
  }
  
  if(!game) {
    return <strong>Loading...</strong>;
  }

  return (
    <article>
      <h1>{game.name}</h1>

      {user && (
        <div>
          <Link to={`/boardgames/${boardgameId}/edit`}>Edit game</Link>
          <button type="button" onClick={handleOpenModal}>Delete game</button>
        </div>
      )}

      <img width="300" src={game.image} alt={`Poster for ${game.name}`} />

      <section>
        <h2>Number of Players</h2>
        <div>
          Min: {game.numberOfPlayers.min}{' '}
          Max: {game.numberOfPlayers.max}
        </div>
        <div>
          Recommended: {game.numberOfPlayers.recommended}{' '}
          Best: {game.numberOfPlayers.best}
        </div>
      </section>

      <p dangerouslySetInnerHTML={{__html: game.description}}></p>

      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <h2>Attention!</h2>
        <p>Are you sure you want to delete this game?</p>
        <footer>
          <button onClick={handleCloseModal}>Cancel</button>
          <button onClick={handleDeleteGame}>Delete the game</button>
        </footer>
     </Modal>
    </article>
  )
}
