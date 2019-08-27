import React from 'react';
import {SwapiServiceConsumer} from "../swapi-service-context/swapi-service-context";

const withSwapiService = (mapMethodsProps) => (Wrapped) => {
    return (props) => {
        return (
            <SwapiServiceConsumer>
                {
                    (swapiService) => {
                        const serviceProps = mapMethodsProps(swapiService);
                        return (
                            <Wrapped {...props} {...serviceProps} />
                        )
                    }
                }
            </SwapiServiceConsumer>
        )
    }
};

export default withSwapiService;