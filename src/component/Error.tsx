import { Component } from 'react';

class Error extends Component<{ text: string; run: boolean }> {
  render() {
    return (
      <div
        className={
          this.props.run
            ? 'absolute p-10 w-full h-screen bg-white opacity-90 z-10 visible'
            : 'absolute p-10 w-full h-screen bg-white opacity-90 z-10 invisible'
        }
      >
        <div className="flex items-center justify-center">
          <span className="text-2xl mr-4">{this.props.text}</span>
        </div>
      </div>
    );
  }
}

export default Error;
