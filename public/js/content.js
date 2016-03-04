var Content = React.createClass({
    getInitialState: function(){
        return {
            activeBoxes: []
        }
    },
    componentWillMount: function(){
        this.setState({activeBoxes: []})
    },
    addBox: function() {
        var activeBoxes = this.state.activeBoxes.slice();
        activeBoxes.push(React.createElement(SearchBox, {}));
        this.setState({ activeBoxes: activeBoxes });
    },
    removeBox: function(index){
        this.setState({
            activeBoxes: this.state.activeBoxes.filter((_, i) => i !== index)
        });
    },

    render: function(){
        return (
            <div id="main-content">
                <div id="active-boxes-container"> {
                    this.state.activeBoxes.map(function(component, i) {
                        return (
                            <ContentBox key={i} component={component} onClose={this.removeBox.bind(this, i)} ref={'item' + i}/>
                        )
                    }, this)
                    }
                </div>
                <div className="row">
                    <button onClick={this.addBox} >Add Box</button>
                </div>
            </div>
        )
    }
});

var ContentBox = React.createClass({
    render: function(){
        return (
            <div className="content-box">
                <button className="close-button" onClick={this.props.onClose}>X</button>
                {this.props.component}
            </div>

        )
    }
});

