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

class Example extends Component {

  static propTypes = {
    example: PropTypes.func,
  }

  componentWillMount() {
       setInterval((() => {
           this.moveBall()
     }), 10)
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

       if ((bar1.x <= ballon.x && bar1.x + 1000 >= ballon.x) && ballon.y < 10) {

              vecDirecteur=  Math.random() * (angleMax - (0.1)) + (0.1) * speedVec
       }
       console.log(bar2);
       if ((bar1.x <= ballon.x && bar1.x + 1000 >= ballon.x) && ballon.y > 399) {

              vecDirecteur=  Math.random() * (-0.1 - (angleMin)) + (angleMin) * speedVec
       }

      if (this.state.ballPos.y < 890){
          this.setState({ballPos: {form: 'o', y: this.state.ballPos.y = 1200, x: this.state.ballPos.x = 50, direction: -speed, vecDirecteur: 0}})
      } else if (this.state.ballPos.y > 1661){
          this.setState({ballPos: {form: 'o', y: this.state.ballPos.y = 1200, x: this.state.ballPos.x = 50, direction: speed, vecDirecteur: 0}})
      }
      this.setState({ballPos: {form: 'o', y: this.state.ballPos.y + direction, x: this.state.ballPos.x + vecDirecteur }, direction, vecDirecteur })
}

  movePlayers = (e) => {
      if(e.keyCode === 65){ this.setState({up1: this.state.up1 + 10})}
      if(e.keyCode === 81){ this.setState({up1: this.state.up1 - 10})}
      if(e.keyCode === 38){ this.setState({up2: this.state.up2 - 10})}
      if(e.keyCode === 40){ this.setState({up2: this.state.up2 + 10})}
  }

  state = {
    text: "Hello from my Component",
    direction:  -speed,
    vecDirecteur: 0,
    up1: 10,
    up2: 10,
    ballPos: {
        x: 1500,
        y: 50,
        form: 'o'
    }
  }

  render () {
     const { text, up1, up2 }  = this.state
     const { example } = this.props
     let toto = ['|','|','|','|']

     return (
        <div onKeyDown={this.movePlayers}className="text" tabIndex="0">
            <div ref="bar1" style={{ height: '10px', width: '32%', position: 'absolute', background: 'red', top: '10px', left: '34%'}} />
            <div ref="bar2" style={{ height: '10px', width: '32%', position: 'absolute', background: 'red', top: '400px', left: '34%'}} />
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
