var React = require('react');

module.exports = React.createClass({
    render: function(){
        return(
            <div style={{width: '400px'}}>
                <div style={{width: this.props.progress+'%', backgroundColor: 'green'}}>{this.props.progress+'%'}</div>
            </div>
        );
    }
});