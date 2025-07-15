import { Component } from 'react';

class Card extends Component<{ name: string; text: string }> {
  static readonly defaultProps = {
    name: 'Имя',
    text: '',
  };
  render() {
    return (
      <div className="relative m-1 w-60 rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg">
        <div className="bg-white p-5 rounded-md">
          <h1 className="font-bold text-xl mb-2">{this.props.name}</h1>
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }
}

export default Card;
