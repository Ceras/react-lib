var React = require('react');

module.exports = React.createClass({
    render: function(){
        return(
            <div>
                <div style={{width: this.props.progress+'%', backgroundColor: 'green'}}>{this.props.progress+'%'}</div>
            </div>
        );
    }
});