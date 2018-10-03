import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll'

import MethodComponent from './MethodComponent';

function splitTag(value) {
    return value.split(':');
}


class RouteComponent extends Component {
    render() {
        let methods = [];
        for (const key in this.props.route.components) {
            if (this.props.route.components.hasOwnProperty(key)) {
                const element = this.props.route.components[key];
                methods.push(
                    <MethodComponent
                        type={key}
                        key={key}
                        route={this.props.name}
                        data={element}
                    />
                );
            }
        }

        const tags = this.props.route.tags;
        let urlParams;
        if (tags) {
            if (tags['optional:allof:queryarg'] || tags['required:allof:queryarg']) {
                let paramsRows = [];
                if (tags['optional:allof:queryarg']) {
                    for (let i = 0; i < tags['optional:allof:queryarg'].length; i++) {
                        const element = tags['optional:allof:queryarg'][i];
                        const splittedElement = splitTag(element);
                        paramsRows.push(<tr key={splittedElement[0]}>
                            <td><strong>{splittedElement[0]}</strong></td>
                            <td>No</td>
                            <td>{splittedElement[1]}</td>
                            <td>{splittedElement[2]}</td>
                        </tr>);
                    }
                }
                if (tags['required:allof:queryarg']) {
                    for (let i = 0; i < tags['required:allof:queryarg'].length; i++) {
                        const element = tags['required:allof:queryarg'][i];
                        const splittedElement = splitTag(element);
                        paramsRows.push(<tr key={splittedElement[0]}>
                            <td><strong>{splittedElement[0]}</strong></td>
                            <td>Yes</td>
                            <td>{splittedElement[1]}</td>
                            <td>{splittedElement[2]}</td>
                        </tr>);
                    }
                }
                urlParams = (
                    <div className="url-params-block">
                        <h6>
                            <i className="fas fa-link"></i>
                            &nbsp;
                            URL Query Parameters
                        </h6>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Required</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paramsRows}
                            </tbody>
                        </table>
                    </div>
                );
            }    
        }

    
        return (
            <div>
                <Element name={this.props.name}>
                    <h3 className="route-title">
                        &nbsp;
                        {this.props.name}
                        &nbsp;
                        <span className="route-title-summary">
                            {this.props.route.summary}
                        </span>
                    </h3>
                    {
                        this.props.route.description && 
                        <h6>{this.props.route.description}</h6>
                    }
                    {urlParams}
                    <div className="clearfix"></div>
                </Element>
                <hr/>
                {methods}
            </div>
        );
    }
}

RouteComponent.propTypes = {
    name: PropTypes.string.isRequired,
    route: PropTypes.shape({
        components: PropTypes.object.isRequired,
        summary: PropTypes.string.isRequired,
        description: PropTypes.string,
        tags: PropTypes.object
    }).isRequired,
};

export default RouteComponent;