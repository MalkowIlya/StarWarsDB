import {Component} from "react";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";
import React from "react";

const WithData = (View, props) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null,
                loading: true,
                error: false,
            }
        };
        onError = (err) => {
            this.setState({
                error: true,
                loading: false,
            })
        };

        componentDidMount() {
            this.update();
        }
        componentDidUpdate(prevProps) {
            if(this.props.getData !== prevProps.getData) {
                this.update();
            }
        }

        update() {
            this.setState({
                loading: true,
                error: false,
            });
            this.props.getData()
                .then((data) => {
                    this.setState({
                        data,
                        loading: false,
                    })
                })
                .catch(this.onError);
        }

        render() {

            const {data, loading, error} = this.state;
            if(loading) {
                return <Spinner />
            }
            if(error) {
                return <ErrorIndicator />
            }
            return <View {...this.props} data={data} />;
        }
    };
};

export default WithData;