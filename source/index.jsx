var React = require('react');
var ReactDom = require('react-dom');
require('./index.css');
//
var componentList = [
    "./components/testComp1/",
    "./components/testComp2/"
];


var treeStyle = {verticalAlign: 'top', backgroundColor: '#dddddd', height: '100%', width: '20%', display: 'inline-block'};
var viewerStyle = {verticalAlign: 'top', height: '100%', backgroundColor: '#999999', width: '80%', display: 'inline-block'};

var App = React.createClass({

    getInitialState: function(){
        return {
            selectedComponentPath: undefined
        }
    },

    showComponent: function(componentPath){
        this.setState({selectedComponentPath: componentPath});
    },

    render: function(){
        var renderedComponent = (<div></div>);

        var componentTree = componentList.map(function(compPath){
            var conf = require(compPath + 'conf.json');

            return (<TreeItem {...conf} showComponent={this.showComponent} path={compPath} key={conf.name + 'tree'}></TreeItem>)
        }.bind(this));

        //if(this.state.selectedComponentPath !== undefined){
        //    var conf = require(this.state.selectedComponentPath + 'conf.json');
        //    var Component = require(this.state.selectedComponentPath + 'index');
        //    renderedComponent = (<Component key={conf.name} {...conf.props}></Component>);
        //}

        return (
            <div style={{position: 'absolute', top: 0, left:0, margin: 0, width: '100%', height: '100%'}}>
                <div style={{backgroundColor: 'red'}}>blaaa</div>
                <div style={treeStyle}>{componentTree}</div>
                <ComponentViewer style={viewerStyle} {...this.state}/>
            </div>
        )
    }
});

var TreeItem = React.createClass({
    showComponent: function(){
        this.props.showComponent(this.props.path)
    },

    render: function(){
        return (
            <div onClick={this.showComponent}>
                <a href="#" compPath={this.props.compPath}>{this.props.name}</a>
            </div>);
    }
});

var ComponentViewer = React.createClass({

    componentWillReceiveProps: function(newProps){
        this.setState({
            conf: require(newProps.selectedComponentPath + 'conf.json'),
            component: require(newProps.selectedComponentPath + 'index')
        });
    },

    onPropsChange: function(newProps){
        var conf = this.state.conf;
        conf.props = newProps;

        this.setState({conf: conf});
    },

    render: function(){
        if(this.state !== null){
            return(
                <div style={this.props.style}>
                    <div className={"block"}>
                        <div className={"centered"}>
                            <this.state.component key={this.state.conf.name} {...this.state.conf.props}></this.state.component>
                        </div>
                    </div>
                    <ComponentEditor style={{height: "40%", borderTop: '1px solid'}} {...this.state.conf} onPropsChange={this.onPropsChange}/>
                </div>
            );
        } else {
            return(
                <div style={this.props.style}>
                    <div style={{height: "60%"}}><div styl={{backgroundColor: 'red'}}>test</div></div>
                    <div style={{height: "40%", borderTop: '1px solid'}}>tet</div>
                </div>
            );
        }
    }
});

var ComponentEditor = React.createClass({
    onChange: function(prop, value){
        var changedProps = this.props.props;
        changedProps[prop] = value;

        this.props.onPropsChange(changedProps);
    },

    render: function(){
        var compProps = this.props.props || {},
            renderedJSON = [],
            lB = '{',
            rB = '}';

        renderedJSON.push((<div key={lB}>{lB}</div>));
        Object.keys(compProps).forEach(function(propertyName){
            renderedJSON.push((<JsonProp key={propertyName} name={propertyName} value={compProps[propertyName]} onChange={this.onChange}/>))
        }.bind(this));
        renderedJSON.push((<div key={rB}>{rB}</div>));

        return(<div style={this.props.style}>{renderedJSON}</div>);
    }
});

var JsonProp = React.createClass({
    onChange: function(event){
        this.props.onChange(this.props.name, event.target.value);
    },
    render: function(){
        return(<div>{this.props.name}: <input value={this.props.value} onChange={this.onChange}/></div>);
    }
});

ReactDom.render(<App/>, document.getElementById('react-lib'));