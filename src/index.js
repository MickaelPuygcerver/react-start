import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Casa(props){
    return (
        <button className="casa" onClick={props.onClick}>
            {props.model}
        </button>
    );
}

class Tabuleiro extends React.Component {
    renderizarCasa(numeroDaCasa){
        return <Casa onClick={() => this.props.onClick(numeroDaCasa)} 
                    model={this.props.casas[numeroDaCasa]}/>;
    }

    render() {
        return (
        <div>
            <div className="board-row">
                {this.renderizarCasa(0)}
                {this.renderizarCasa(1)}
                {this.renderizarCasa(2)}
            </div>
            <div className="board-row">
                {this.renderizarCasa(3)}
                {this.renderizarCasa(4)}
                {this.renderizarCasa(5)}
            </div>
            <div className="board-row">
                {this.renderizarCasa(6)}
                {this.renderizarCasa(7)}
                {this.renderizarCasa(8)}
            </div>
        </div>
        );
    }
}

class Jogo extends React.Component {
    constructor(props){
        super();
        this.state = {
            historico: [{ casas: new Array(9).fill(null) }],
            xEhProximo: true,
            numeroJogada: 0
        }
    }

    irParaJogada(index){
        this.setState({
            numeroJogada: index,
            xEhProximo: index % 2 == 0? true : false
        });
    }

    clickCasa(numeroDaCasa){
        const historico = this.state.historico.slice(0, this.state.numeroJogada + 1);
        const jogadaAtual = historico[historico.length - 1];
        const casas = jogadaAtual.casas.slice();

        if(calcularVencedor(casas) != null || 
        casas[numeroDaCasa] != null)
            return;

        casas[numeroDaCasa] = this.state.xEhProximo ? 'X' : 'O';

        this.setState({
            historico: historico.concat([{
                casas: casas
            }]),
            xEhProximo: !this.state.xEhProximo,
            numeroJogada: historico.length
        });
    }

    render() {
        let jogadaAtual = this.state.historico[this.state.numeroJogada];
        let casas = jogadaAtual.casas;

        let status = 'Proximo jogador: ' + (jogadaAtual.xEhProximo ? 'X' : 'O');
        let vencedor = calcularVencedor(casas);
        if(vencedor)
            status = 'O vencedor é: ' + (jogadaAtual.xEhProximo ? 'O' : 'X');
    
        const jogadas = this.state.historico.map((jogada, index) => {
            const desc = index ? 'Ir para a jogada #' + index : 'Ir para o inicio do jogo';
            return(
                <li key={index}>
                    <button onClick={() => this.irParaJogada(index)}>{desc}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Tabuleiro casas={casas} onClick={(i) => this.clickCasa(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{jogadas}</ol>
                </div>
            </div>
        );
    }
}

function calcularVencedor(casas) {
    const linhas = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < linhas.length; i++) {
      const [a, b, c] = linhas[i];
      if (casas[a] && casas[a] === casas[b] && casas[a] === casas[c]) {
        return casas[a];
      }
    }
    return null;
}

ReactDOM.render(
    <Jogo></Jogo>,
    document.getElementById('root')
);