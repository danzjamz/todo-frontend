import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css'

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            todo: '',
            todos: []
        }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8200/todos')
            .then(res => res.json())
            .then(data => {
                console.log(data) 
                let newArr = []
                data.map(todo => {
                    console.log(todo)
                    newArr.push(todo)
                    return this.setState({ todos: [ ...this.state.todos, todo.title ]})
                });
                console.log(newArr)
                // this.setState({ todos: [ ...newArr ]})
            }).catch(err => {
                console.log(err)
            })
    }

    handleChange = (event) => {
        this.setState({ todo: event.target.value })
    }

    handleSubmit = (event) => {
        this.setState({ todos: [ ...this.state.todos, this.state.todo ], todo: '' })
        let newTodo = { title: this.state.todo, done: false }

        const requestOptions = {
            method: 'POST',
            body: newTodo
        }

        fetch('http://127.0.0.1:8200/todo', requestOptions)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            });

        event.preventDefault();
    }

    handleDelete = (todo, index) => {
        console.log(todo)
        
    }

    render() {
        return (
            <div className='app'>
                <h1>Todo List</h1>
                <form className='add-todo' onSubmit={ this.handleSubmit }>
                    <input
                        type='text'
                        placeholder='add todo'
                        value={ this.state.todo }
                        onChange={ this.handleChange }
                    />
                    <button>Add</button>
                </form>

                <ul>
                { this.state.todos ? (
                    this.state.todos.map((todo) => {
                        return (
                            <li 
                                key={ todo.id } 
                                onClick={ () => this.handleDelete(todo.id) }
                            >
                                { todo }
                            </li>
                        )
                    })
                    ) : (
                    null
                )}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));