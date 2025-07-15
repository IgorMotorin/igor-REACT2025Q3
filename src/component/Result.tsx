import { Component } from 'react';
import Card from './Card';

class Result extends Component<{ cards: { fact: string; text: string }[] }> {
  static readonly defaultProps = {
    cards: [{ fact: '', text: '' }],
  };
  render() {
    return (
      <div className="flex justify-center flex-wrap">
        {this.props.cards.map((itm, idx) => {
          return <Card key={idx + 'a'} name={itm.fact} text={itm.text}></Card>;
        })}
      </div>
    );
  }
}

export default Result;
