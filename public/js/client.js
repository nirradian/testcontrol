var Main = React.createClass({
    render: function(){
        return (
            <div id="react-body">
                <NavBar/>
                <Content/>
            </div>
        )
    }
});

React.render(<Main/>, document.getElementById('mount-point'));