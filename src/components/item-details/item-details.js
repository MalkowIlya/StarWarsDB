import React, {Component} from 'react';
import './item-details.scss';
import SwapiService from "../../services/swapi-service";
import ErrorIndicator from "../error-indicator/error-indicator";
import ErrorButton from "../error-button/error-button";

const Record = ({item, field, label}) => {
    return (
        <li className={"list-group-item"}>
            <span className={"term"}>{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export {
    Record
}

export default class ItemDetails extends Component {
    swapiService = new SwapiService();
    constructor(props){
        super(props);
        this.state = {
            item: null,
            image: null,
            error: false,
        };
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId  ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
        }
    }

    onError = (err) => {
        this.setState({
            error: true,
        })
    };

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if(!itemId) {
            return;
        }
        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item),
                })
            })
            .catch(this.onError);
    }

    render() {
        const {item, image} = this.state;
        if (!item) {
            return <span>Select a item from a list</span>
        }
        if(this.state.error) {
            return <ErrorIndicator />
        }

        const {name} = item;

        return (
            <div className={"item-details card"}>
                <img className={"item-image"} src={image} alt=""/>

                <div className={"card-body"}>
                    <h4>{name}</h4>
                    <ul className={"list-group list-group-flush"}>
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, {item});
                            })
                        }
                        <ErrorButton />
                    </ul>
                </div>
            </div>
        )
    }
}