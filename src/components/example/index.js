import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import example from '../../actions/example'
import ReactDOM from 'react-dom';
import "./style.scss"

const speed = 2
const speedVec = 1
const angleMax = 0.8
const angleMin = -0.8
let game = null


class Example extends Component {

  static propTypes = {
    example: PropTypes.func,
  }


componentDidMount() {
     let direction = this.state.direction
     let vecDirecteur = this.state.vecDirecteur
     this.setState({ballPos: {form: 'o', y: 1200, x: 50, direction: -speed, vecDirecteur: 0}, isStart: false})
     this.focusDiv();
     this.startGameSocket()
}

focusDiv() {
  ReactDOM.findDOMNode(this.refs.bigDiv).focus();
}

startGameSocket = () => {

        socket.on('action', ((e) => {
            console.log(e);
            this.setState({[e.toUpdate]: e.value})
        }))
}

moveBall = () => {
      let direction = this.state.direction
      let vecDirecteur = this.state.vecDirecteur
      let barre1 = ReactDOM.findDOMNode(this.refs.idUp1).getBoundingClientRect()
      let barre2 = ReactDOM.findDOMNode(this.refs.idUp2).getBoundingClientRect()
      let ballon = ReactDOM.findDOMNode(this.refs.balloon).getBoundingClientRect()
      let bar1 = ReactDOM.findDOMNode(this.refs.bar1).getBoundingClientRect()
      let bar2 = ReactDOM.findDOMNode(this.refs.bar2).getBoundingClientRect()

      if ((barre1.y  <= ballon.y && barre1.y+ 72 >= ballon.y) && ballon.x === 900) {
          direction = speed
          vecDirecteur=  Math.random() * (angleMax - (angleMin)) + (angleMin) * speedVec
      }
      if ((barre2.y  <= ballon.y && barre2.y+ 72 >= ballon.y) && ballon.x === 1660) {
          direction= -speed
          vecDirecteur=  Math.random() * (angleMax - (angleMin)) + (angleMin) * speedVec
      }
      if ((bar1.x <= ballon.x && bar1.x + 1000 >= ballon.x) && ballon.y < 8.5) {
          vecDirecteur=  Math.random() * (angleMax - (0.1)) + (0.1) * speedVec
      }
      if ((bar1.x <= ballon.x && bar1.x + 1000 >= ballon.x) && ballon.y > 399) {
          vecDirecteur=  Math.random() * (-0.1 - (angleMin)) + (angleMin) * speedVec
      }
      if (this.state.ballPos.y < 890){
          this.state.scorePtwo++;
          this.setState({ballPos: {form: 'o', y: this.state.ballPos.y = 1200, x: this.state.ballPos.x = 50, direction: -speed, vecDirecteur: 0}, isStart: false})
           clearInterval(game)
      } else if (this.state.ballPos.y > 1661){
          this.state.scorePone++;
          this.setState({ballPos: {form: 'o', y: this.state.ballPos.y = 1200, x: this.state.ballPos.x = 50, direction: speed, vecDirecteur: 0}, isStart: false})
           clearInterval(game)
      }
        this.setState({ballPos: {form: 'o', y: this.state.ballPos.y + direction, x: this.state.ballPos.x + vecDirecteur }, direction, vecDirecteur })
}

movePlayers = (e) => {
    if (e.keyCode === 65){ this.setState({up1: this.state.up1 + 10}); socket.emit('movePlayer', {toUpdate: 'up1', value: this.state.up1})}
    if (e.keyCode === 81){ this.setState({up1: this.state.up1 - 10}); socket.emit('movePlayer', {toUpdate: 'up1', value: this.state.up1})}
    if (e.keyCode === 38){ this.setState({up2: this.state.up2 - 10}); socket.emit('movePlayer', {toUpdate: 'up2', value: this.state.up2})}
    if (e.keyCode === 40){ this.setState({up2: this.state.up2 + 10}); socket.emit('movePlayer', {toUpdate: 'up2', value: this.state.up2})}
    if (e.keyCode === 32 && !this.state.isStart){
        game = setInterval((() => {
            this.moveBall()
        }), 10)
    this.setState({isStart: true})
    // socket.emit('movePlayer', this.state.isStart)
    }
}

  state = {
    text: "Hello from my Compfonent",
    direction:  -speed,
    isStart: false,
    vecDirecteur: 0,
    up1: 200,
    up2: 50,
    scorePone: 0,
    scorePtwo: 0,
    ballPos: {
        x: 1500,
        y: 10,
        form: 'o'
    }
  }

  render () {
     const { text, up1, up2,  }  = this.state
     const { example } = this.props
     let toto = ['|','|','|','|']

     return (
        <div ref="bigDiv" onKeyDown={this.movePlayers} className="text" tabIndex="0">
            <div ref="bar1" style={{ height: '412px', width: '32%', position: 'absolute', top: '10px', left: '34%', border: 'thick solid #FFFFFF'}} />
            <div ref="bar2" style={{ height: '10px', width: '32%', position: 'absolute', top: '425px', left: '34%'}} />
            <div class="score" style={{ height: '50px', width: '50px', position:'absolute', top: '200px', left: '30%', textAlign: 'center', border: 'thick solid #FFFFFF'}}>{this.state.scorePone}</div>
            <div class="score" style={{ height: '50px', width: '50px', position:'absolute', top: '200px',  left: '68%', textAlign: 'center', border: 'thick solid #FFFFFF'}}>{this.state.scorePtwo}</div>
                <div ref="idUp1" style={{display: 'flex', flexDirection: 'column-reverse', top: `${up1}px`, left: '35%', position: 'relative'}}>
                {toto.map((e, key) => {
                    return(
                    <div key={key} style={{ color: 'rgb(30 * key, 0, 255)'}}>
                    {e}
                    </div>
                )
                })}
                </div>
                <h1 ref="balloon" style={{display: 'flex', flexDirection: 'column', top: `${this.state.ballPos.x}px`, left: `${this.state.ballPos.y}px`, position: 'relative'}}>{this.state.ballPos.form}</h1>
                <div ref="idUp2" style={{display: 'flex', flexDirection: 'column', top: `${up2}px`, left: '65%', position: 'relative'}}>
                {toto.map((e, key) => {
                    return(
                    <div key={key} style={{ color: 'rgb(30 * key, 0, 255)'}}>
                    {e}
                    </div>
                )
                })}
                </div>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    example: (data) => dispatch(example(data)),
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Example)
