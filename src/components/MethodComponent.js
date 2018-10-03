import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll'

function formatMethod(value) {
    return value.replace('method:', '');
}

function splitTag(value) {
    return value.split(':');
}

class MethodComponent extends Component {
    render() {
        const formattedMethod = formatMethod(this.props.type);
        const tags = this.props.data.tags;
        const components = this.props.data.components;

        let auth;
        let urlParams;
        if (tags) {
            if (tags['require:userauth'] && tags['require:userauth'][0] === "authenticated") {
                auth = <span className="auth-label"><i className="fas fa-key"></i>&nbsp;Requires authentication</span>
            }
    
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

        let bodyParams;
        if (components) {
            if (components['input:body:example'] || components['input:body:schema']) {
                let example;
                let schema;
                if (components['input:body:example']) {
                    example = <pre>{components['input:body:example'].description}</pre>
                }
                if (components['input:body:schema']) {
                    schema = <pre>{components['input:body:schema'].description}</pre>
                }
                bodyParams = (
                    <div className="request-body-block">
                        <h6>
                            <i className="fas fa-code"></i>
                            &nbsp;
                            Request body
                        </h6>
                        {example && <strong>Example</strong>}
                        {example}
                        {schema && <strong>Schema</strong>}
                        {schema}
                    </div>
                );
            }
        }


        return (
            <div className="method-block">
                <Element name={`${this.props.route}-${formattedMethod}`}>
                    <h4>
                        <span className={`badge badge-${formattedMethod}`}>
                            {formattedMethod}
                        </span>
                        &nbsp;
                        {this.props.route}
                        <span className="method-title-summary">
                            {this.props.data.summary}
                        </span>
                    </h4>
                    {auth}
                    <p>{this.props.data.description}</p>
                    {urlParams}
                    {bodyParams}
                </Element>
            </div>
        );
    }
}

MethodComponent.propTypes = {
    type: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    data: PropTypes.shape({
        description: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        tags: PropTypes.object,
        components: PropTypes.object,
    }).isRequired,
}

export default MethodComponent;