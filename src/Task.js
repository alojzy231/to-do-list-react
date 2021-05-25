import React from 'react';

class Task extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            text : "",
            changing : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
    }
    componentDidMount(){
        this.setState({ text : this.props.text });
    }

    handleChange(){
        this.setState({ changing : true });
    }
    handleDelete(){
        this.props.onDelete(this.props.index);
    }
    handleSave(){
        localStorage.setItem(`task_${this.props.index}`,this.state.text);
        this.setState({ changing : false });
    }
    handleDiscard(){
        this.setState({ 
            text : localStorage.getItem(`task_${this.props.index}`,this.state.text),
            changing : false 
        });
    }

    render(){
        return (
        <div className="task">
            <textarea 
            disabled={this.state.changing ? false : true}
            value={this.state.text}
            onChange={e => this.setState({ text : e.target.value})}
            />
            {this.state.changing ? 
            <div className="buttons">
                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.handleDiscard}>Discard</button>
            </div>
                :
            <div className="buttons">
                <button onClick={this.handleChange}>Change</button>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        }
            
        </div>
        );
    }
}

export default Task;