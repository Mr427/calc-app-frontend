import React from "react";
import Superagent from "superagent";

function NumKey(props) {
  return(
    <button
      className={props.class}
      value={props.value}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function Text(props) {
  return(
    <input
      value={props.output}
      placeholder={props.placeholder}
    />
  )
}

class Keypad extends React.Component {
  renderKey(c, v) {
    return (
      <NumKey
        class={c}
        value={v}
        onClick={() => this.props.onClick(v)}
      />
    )
  }

  render() {
    return (
      <div className="keypad">
        <div className="number-keys">
          <div className="keypad-row">
            {this.renderKey("square", "CE")}
            {this.renderKey("square", "C")}
          </div>
          <div className="keypad-row">
            {this.renderKey("square", 7)}
            {this.renderKey("square", 8)}
            {this.renderKey("square", 9)}
          </div>
          <div className="keypad-row">
            {this.renderKey("square", 4)}
            {this.renderKey("square", 5)}
            {this.renderKey("square", 6)}
          </div>
          <div className="keypad-row">
            {this.renderKey("square", 1)}
            {this.renderKey("square", 2)}
            {this.renderKey("square", 3)}
          </div>
          <div className="keypad-row">
            {this.renderKey("square", 0)}
            {this.renderKey("square", ".")}
          </div>
        </div>
        <div className="operation-keys">
          <ul className="okeys-list">
            <li>
              {this.renderKey("square", "=")}
            </li>
            <li>
              {this.renderKey("square", "+")}
            </li>
            <li>
              {this.renderKey("square", "-")}
            </li>
            <li>
              {this.renderKey("square", "*")}
            </li>
            <li>
              {this.renderKey("square", "/")}
            </li>              
          </ul>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftOperand: 0,
      rightOperand: 0,
      output: 0,
      hasDecimal: false,
      operatorPressed: false,
      operatorType: null
    }
  }

  doMath() {
    switch(this.operatorType)
    {
      case "+":
      {
        let o = this.leftOperand + this.rightOperand;
        this.setState({
          leftOperand:o,
          output:o
        });
      }break;
      case "-":
      {
        let o = this.leftOperand - this.rightOperand;
        this.setState({
          leftOperand:o,
          output:o
        });
      }break;
      case "*":
      {
        let o = this.leftOperand * this.rightOperand;
        this.setState({
          leftOperand:o,
          output:o
        });
      }break;
      case "/":
      {
        if(this.rightOperand !== 0)
        {
          let o = this.leftOperand + this.rightOperand;
          this.setState({
            leftOperand:o,
            output:o
          });
        } else {
          this.setState({
            leftOperand:0,
            output:"Error Divide by 0"
          })
        }
      }break;
      default:
      {
        console.log("default");
      }
    }
  }

  storeValue(v) {
    let o;
    if(!this.state.operatorPressed) {
      o = this.state.leftOperand.toString().concat(v.toString());
      this.setState({
        leftOperand:o,
        output: o
      });
    } else {
      o = this.state.rightOperand.toString().concat(v.toString());
      this.setState({
        rightOperand:o,
        output: o
      });
    } 
  }

  handleClick(i) {
    console.log(typeof(i));
    if(typeof(i) === "number") {
      if(this.state.output !== 0) {
        this.storeValue(i);
      } else {
        if(!this.state.operatorPressed) {
          this.setState({
            leftOperand:i,
            output:i
          });
        } else {
          this.setState({
            rightOperand:i,
            output:i
          });
        }
      }
    } else {
      switch(i)
      {
        case ".":
        {
          if(!this.state.hasDecimal) {
            this.state.hasDecimal = true;
            this.storeValue(i);
          }
        }break;
        case "+":
        case "-":
        case "*":
        case "/":
        {
          this.setState({
            operatorPressed:true,
            operatorType:i,
            output:0
          })
        }break;
        case "C":
        {
          if(!this.state.operatorPressed)
          {
            this.setState({
              leftOperand:0,
              output:0
            });
          } else {
            this.setState({
              rightOperand:0,
              output:0
            });           
          }
        }break;
        case "CE":
        {
          this.setState({
            leftOperand:0,
            rightOperand:0,
            output:0,
            hasDecimal:false,
            operatorPressed:false,
            operatorType:null
          });
        }break;
        case "=":
        {
          this.doMath();
        }break;
        default:
        {

        }
      }
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="output">
          <Text
            output={this.state.output}
            placeholder={0}
          >
          </Text>
        </div>
        <Keypad
          onClick = {(i) => this.handleClick(i)}
        />
        <div>
          <input value={this.state.leftOperand} />
          <input value={this.state.rightOperand} />
          <input value={this.state.output} />
          <input value={this.state.hasDecimal} />
          <input value={this.state.operatorPressed} />
          <input value={this.state.operatorType} />
        </div>
      </div>
    );
  }
}

export default App;

/* Super Agent set-up
handleSubmit(e) {
  e.preventDefault();
  return Superagent.get("http://localhost:3030/movie")
    .then(res => {
      console.log(res.text);
      this.setState({
        label: "Clicked!",
        value: res.text,
      });
      {this.renderImage()}
    }).catch(err => {
      console.log(err);
      this.setState({
        label: "Error",
      });
    });
}
*/
