import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './random-planet.scss';
import SwapiService from '../../services/swapi-service';
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

export default class RandomPlanet extends Component {
    swapiService = new SwapiService();
    constructor(props) {
        super(props);
        this.state = {
            planet: {},
            loading: true,
            error: false,
        };
    }

    static defaultProps = {
        updateInterval: 10000,
    };
    static  propsTypes = {
        updateInterval: PropTypes.number
    };

    componentDidMount() {
        const {updateInterval} = this.props;
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
        });
    };

    onError = (err) => {
        this.setState({
            loading: false,
            error: true,
        })
    };

    updatePlanet = () => {
        const id = Math.floor(Math.random()*25 + 3);
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render() {
        const {planet, loading, error} = this.state;
        const hasData = !(loading || error);
        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PlanetView planet={planet}/> : null;

        return (
            <div className={"random-planet jumbotron rounded"}>
                {spinner}
                {content}
                {errorMessage}
            </div>
        )
    }
}


const PlanetView = ({planet}) => {
    const {id, name, population, rotationPeriod, diameter} = planet;
    return (
        <React.Fragment>
            <img className={"planet-image"} src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt=""/>
            <div>
                <h4>{name}</h4>
                <ul className={"list-group list-group-flush"}>
                    <li className={"list-group-item"}>
                        <span className={"term"}>Population </span>
                        <span>{population}</span>
                    </li>
                    <li className={"list-group-item"}>
                        <span className={"term"}>Rotation Period </span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className={"list-group-item"}>
                        <span className={"term"}>Diameter </span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
};
