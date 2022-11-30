import "./GameOver.css"

const GameOver = ({retry}) => {
  return (
    <div>
      <h1>Retry</h1>
      <button onClick={retry}>Voltar ao inicio</button>
    </div>
  )
}

export default GameOver