import React from 'react'
import ItemList from '../item-list/item-list';
import withData from '../hoc-helpers/with-data';
import withSwapiService from '../hoc-helpers/with-swapi-service';
import withChildFunction from '../hoc-helpers/with-child-function';
import compose from '../hoc-helpers/compose';

const renderName = ({name}) => <span>{name}</span>;
const renderModelAndName = ({model, name}) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople,
    }
};
const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets,
    }
};
const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships,
    }
};

const PersonList = compose(
    withSwapiService(mapPersonMethodsToProps),
    withData,
    withChildFunction(renderName)
)(ItemList);


const PlanetList = compose(
    withSwapiService(mapPlanetMethodsToProps),
    withData,
    withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
    withSwapiService(mapStarshipMethodsToProps),
    withData,
    withChildFunction(renderModelAndName)
)(ItemList);

export {
    PersonList,
    PlanetList,
    StarshipList
};