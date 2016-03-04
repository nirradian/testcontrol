var NavBar = React.createClass({
    getInitialState: function(){
        return {
            initialItems: [
                "Search",
                "Graphs",
                "Sign Out",
                "Settings",
                "Contact Support"
            ],
            items: []
        }
    },
    componentWillMount: function(){
        this.setState({items: this.state.initialItems})
    },
    render: function(){
        return (
            <div id="navigation-bar">
                <AppLogo/>
                <NavList navItems={this.state.items} />
            </div>
        )
    }
});

var NavList = React.createClass({
    render: function(){
        return (
                <ul> {

                    this.props.navItems.map(function(result, i) {
                        return <li key={i} className="nav-option"><NavOption title={result}/></li>;
                    })
                }
                </ul>
        )
    }
});

var NavOption = React.createClass({
    render: function(){
        return (
            <p> { this.props.title} </p>
        )
    }
});

var AppLogo = React.createClass({
    render: function() {
        return (
            <a>
                <img className='logo' src='img/logo.png'/>
            </a>
        )
    }
});
