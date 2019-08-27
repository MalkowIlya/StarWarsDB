import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.scss';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import StarshipDetails from '../sw-components/starship-details';
import ErrorBoundry from '../error-boundry/error-boundry';
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context/swapi-service-context";
import {PeoplePage, PlanetsPage, StarshipsPage, SecretPage, LoginPage} from '../pages';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swapiService: new SwapiService(),
            isLoggedIn: false,
        }
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true,
        })
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ? DummySwapiService: SwapiService;

            console.log('switched to', Service.name);

            return {
                swapiService: new Service()
            }
        })
    };

    render() {
        const { isLoggedIn } = this.state;
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className={"stardb-app"}>
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet updateInterval={5000}/>
                            <Switch>
                                <Route path="/" render={() => <h2>Welcome to StarWars Guide</h2>} exact></Route>
                                <Route path="/people/:id?" component={PeoplePage}/>
                                <Route path="/planets" component={PlanetsPage}/>
                                <Route path="/starships" component={StarshipsPage} exact/>
                                <Route path="/starships/:id"
                                       render={({match}) => {
                                           const {id} = match.params;
                                           return <StarshipDetails itemId={id}/>
                                       }}/>
                                <Route path="/login" render={() => (
                                    <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>
                                )}/>
                                <Route path="/secret" render={() => (
                                    <SecretPage isLoggedIn={isLoggedIn}/>
                                )}/>
                                <Route render={() => <h2>Page not found</h2>} />
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>

            </ErrorBoundry>
        );
    }
};

