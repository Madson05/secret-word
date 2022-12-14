import "./GameOver.css"

const GameOver = ({retry, score, word}) => {
  return (
    <div>
      <h1>Fim de jogo</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>

      <h2>Palavra correta: {word}</h2>
      <button onClick={retry}>Voltar ao inicio</button>
    </div>
  )
}

export default GameOver