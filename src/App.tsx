import { Component, type MouseEventHandler } from 'react';
import Search from './component/Search';
import Result from './component/Result';
import Spinner from './component/Spinner';
import Error from './component/Error';
import ButtonErr from './component/ButtonErr';

class App extends Component {
  state = {
    pets: [],
    inputSearch: localStorage.getItem('appkey') || '',
    url: 'https://catfact.ninja/facts?max_length=100&limit=100',
    spinner: false,
    error: false,
    errorText: 'Ошибка в приложении...',
    buttonError: false,
  };

  componentDidMount(): void {
    const regex = new RegExp(this.state.inputSearch);
    this.updateData(regex);
  }

  updateData = (regex: RegExp) => {
    this.setState({ spinner: true });
    fetch(this.state.url)
      .then((req) => {
        if (req.ok) {
          this.setState({ spinner: false });
          return req.json();
        } else {
          this.setState({
            spinner: false,
            error: true,
            errorText: `Ошибка связи !!! Статус: ${req.status}`,
          });
          return [];
        }
      })
      .then((req) => {
        this.setState({
          pets: req.data.filter((item: { fact: string }) => {
            if (regex.test(item.fact?.toLowerCase())) {
              return true;
            } else {
              return false;
            }
          }),
        });
      })
      .catch((err) => {
        this.setState({
          spinner: false,
          error: true,
          errorText: 'Ошибка связи !',
        });
        console.log(err);
      });
  };

  inputChange = (e: { target: { value: string } }): void => {
    this.setState({ inputSearch: e.target.value });
  };

  inputSearch: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const regex = new RegExp(this.state.inputSearch);
    localStorage.setItem('appkey', this.state.inputSearch);
    this.updateData(regex);
  };

  onError = () => {
    this.setState({ buttonError: true });
  };
  render() {
    return (
      <>
        <Error run={this.state.error} text={this.state.errorText}></Error>
        <Spinner run={this.state.spinner}></Spinner>
        <Search
          onChange={this.inputChange}
          onSearch={this.inputSearch}
          value={this.state.inputSearch}
          buttonError={this.state.buttonError}
        ></Search>
        <Result cards={this.state.pets}></Result>
        <ButtonErr onError={this.onError}></ButtonErr>
      </>
    );
  }
}

export default App;
