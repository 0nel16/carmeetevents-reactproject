import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { HiMiniPlusCircle } from "react-icons/hi2";
import { BoardgameCard } from './BoardgameCard';
import { processServerResponse } from '../../utils';

import styles from './Boardgames.module.css';

const endpoint = `${import.meta.env.VITE_API_URL}/boardgames`;

export function BoardgameList() {
  const [boardgames, setBoardgames] = useState(null);

  useEffect(() => {
    async function getBoardgames() {
      try {
        const data = await fetch(`${endpoint}?_limit=10&_page=29`).then(
          processServerResponse
        );
        setBoardgames(data);
      } catch (e) {
        console.error(e);
      }
    }

    getBoardgames();
  }, []);

  return (
    <section className={styles.gameContainer}>
      <h1>Boardgames</h1>
      {!boardgames && <strong>Loading ...</strong>}
      {boardgames && (
        boardgames.map((bg) => <BoardgameCard key={bg.id} game={bg} />)
      )}
      <Link to="add" className={styles.addBtn}><HiMiniPlusCircle /></Link>
    </section>
  );
}
