import './StartScreen.css';

const StartScreen = ({toChangeToMidGame}) => {
    return (
        <div className="start">
            <h1>Secret Word.</h1>
            <p><span className="highlight">É o detetive entre os amigos?</span> Acha que é bom de descoberta? Então venha tentar descobrir a palavra secreta</p>
            <button onClick={toChangeToMidGame}>Iniciar jogo</button> {/* Função adicionada no compronente pai e passada para cá, com intuíto de trocar de tela */}
            <div className="game-desc">Este projeto foi desenvolvido com o propósito de estudo e aprimoramento das minhas habilidades como desenvolvedor. Ele foi criado em React, com o objetivo de explorar conceitos fundamentais e avançados dessa biblioteca, como componentes, estados, propriedades, hooks e boas práticas de organização de código. A ideia principal é utilizar este espaço como um ambiente de treinamento, onde posso testar novas funcionalidades, experimentar diferentes abordagens e consolidar meus conhecimentos. Embora seja um projeto voltado para aprendizado, busco mantê-lo bem estruturado, limpo e escalável, simulando a realidade de aplicações que poderiam ser utilizadas em produção.</div>
        </div>
    )
}

export default StartScreen;
