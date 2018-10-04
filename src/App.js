import React, { Component } from 'react';
import { getData } from './api/getData';
import RouteComponent from './components/RouteComponent';
// Pictures
import logo from './assets/trackit-white-logo.png';
import { Link } from 'react-scroll'

// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    getData().then(res => {
      console.log(res.data);
      this.setState({
        data: res.data,
      });
    });
  }

  getMethodsBadges(components, route) {
    const res = [];
    for (const key in components) {
      if (components.hasOwnProperty(key)) {
        if (key.includes('method:')) {
          const formatted = key.replace('method:', '');
          res.push(
            <Link
              className="badge-link"
              activeClass="active"
              key={key}
              to={`${route}-${formatted}`}
              spy={true}
              smooth={true}
              offset={-40}
              duration={500}
            >
              <span className="badge badge-secondary" >
                {formatted}
              </span>
            </Link>);
        }
      }
    }
    return res;
  }

  render() {
    let routes = [];
    let routesMenu = [];
    if (this.state.data) {
      for (const key in this.state.data) {
        if (this.state.data.hasOwnProperty(key)) {
          const element = this.state.data[key];
          routes.push(<RouteComponent key={key} name={key} route={element} />);
          routesMenu.push(<li key={key}>
            <Link activeClass="active" to={key} spy={true} smooth={true} offset={-40} duration={500}>
              {key}
            </Link>
            {this.getMethodsBadges(element.components, key)}
          </li>)
        }
      }
    }

    const spinner = <div className="spinner">
      <i className="fa fa-2x fa-sync fa-spin"></i>
    </div>

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-3 d-none d-md-block sidebar">
              <img src={logo} className="logo" alt="TrackIt logo"/>
              <hr/>
              <ul className="menu">
                {routesMenu}
              </ul>
            </nav>
            <main className="col-md-9 ml-sm-auto col-lg-9 px-4">
              <div className="app-container container">
                <h1>TrackIt API Reference</h1>
                <hr/>
                {routes.length ? routes : spinner}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
