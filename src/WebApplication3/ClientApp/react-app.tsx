import * as React from 'react';

export class HelloMessage extends React.Component
{
    render()
    {
        return <h1>Why Hello There {this.props.message}!</h1>;
    }
}