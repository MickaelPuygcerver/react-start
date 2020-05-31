import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Casa extends React.Component {
    render(){
        return (
            <button className="casa" onClick={() => this.props.onClick()} >
                {this.props.model}
            </button>
        );
    }
}


class Tabuleiro extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            casas: new Array(9).fill(null)
        };
    }

    clickCasa(numeroDaCasa){
        let casas = this.state.casas.slice();
        casas[numeroDaCasa] = 'X';

        this.setState({casas: casas});
    }

    renderizarCasa(numeroDaCasa){
        return <Casa onClick={() => this.clickCasa(numeroDaCasa)} 
                    model={this.state.casas[numeroDaCasa]}/>;
    }

    render() {
        const status = 'Next player: X';
        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Tabuleiro />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Jogo></Jogo>,
    document.getElementById('root')
);