import React from 'react'
import ItemDetails, {Record} from '../item-details/item-details';
import withSwapiService from '../hoc-helpers/with-swapi-service';

const StarshipDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="model" label="Model"/>
            <Record field="manufacturer" label="Manufacturer"/>
            <Record field="costInCredit" label="Cost In Credit"/>
            <Record field="length" label="Length"/>
            <Record field="crew" label="Crew"/>
            <Record field="passengers" label="Passengers"/>
            <Record field="cargoCapacity" label="Cargo Capacity"/>
        </ItemDetails>
    )

};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getStarships,
        getImageUrl: swapiService.getStarshipsImage
    }
}

export default withSwapiService(mapMethodsToProps)(StarshipDetails);