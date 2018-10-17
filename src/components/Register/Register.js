import React from 'react';
import {Redirect} from 'react-router-dom'

const initState = {
    name: '',
    email: '',
    password: '',
    toHome: false
}
class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = initState;
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    } 

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmit = () => {
        const {name, email, password} = this.state
        fetch("https://smart-brain-api-self.herokuapp.com/register", {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                entries: 0,
                joined: new Date() 
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id){
                this.props.onGetUser({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    entries: data.entries,
                    joined: data.joined
                })
                this.setState({toHome: true})
            }
        })
        .catch(console.log)
    }

    render(){
        if (this.state.toHome){
            return (
                <Redirect to='/home' />
            )
        }
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="register" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                onChange={this.onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                onChange={this.onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                            onClick={this.onSubmit}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" />
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}

export default Register;