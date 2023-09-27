// Write your JS code here
import {Component} from 'react'
import './index.css'

class  LoginForm extends Component{
    state = {userName : '' , password : '' , notFound : false , emptyPassword: false , emptyUsername : false , showSubmitError : false , errorMsg : ''}

    onChangeUserName = event => {
        this.setState({userName : event.target.value})
    }

    onChangePassword = event => {
        this.setState({password : event.target.value})
    }

    onSubmitSuccess = () => {
        const {history} = this.props
        history.replace('/')
    }

    onSubmitFailure = (errorMsg) => {
        this.setState({showSubmitError : true, errorMsg : errorMsg })
    }
    submitForm = async (event) => {
        event.preventDefault()
        const {userName, password} = this.state
        //console.log(userName, password)
        const userDetails = {username : userName ,  password}

        if(userName === '' && password === ''){
            this.setState({emptyUsername : true , password : true } )
        }else if(password === '') {
            this.setState ({password : true})
        }else if(userName === ''){
            this.setState({userName : true})
        }
        else{
            const url = 'https://apis.ccbp.in/login'

            const options = {
            method : 'POST',
            body : JSON.stringify(userDetails),
            }
            
            
            const response = await fetch(url, options)
            
            console.log(response)
            const data = await response.json()
            

            console.log(data)
            if(data.status_code === 200){
                this.onSubmitSuccess()
            }else{
                this.onSubmitFailure(data.error_msg)
            }
        }
        
        
        
       
        
    }


    render(){
        const {userName , password , notFound , emptyPassword} = this.state
        return (
            <div className='background-container'>
                <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png' alt='website login' className='website-login-img-large'/>
                
                <div className='login-container'>
                    <div className='interface-imgs-container'>
                        <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png' alt='website logo' className='website-logo-img'/>
                        <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png' alt='website login' className='website-login-img-small'/>
                    </div>
                    <form onSubmit={this.submitForm} className='submit-form'>
                        <div className='username-input-container'>
                            <label htmlFor='userName' className='username'>
                                USERNAME
                            </label>

                            <br />
                            <input type='text' id='userName'  placeholder='Username' className='username-input' onChange={this.onChangeUserName} value={userName}/>
                            {emptyPassword &&
                            <p >userName is not found </p>
                            }
                        </div>
                        
                        
                        <div className='password-input-container'>
                            <label htmlFor='passWord' className='password'>
                                PASSWORD
                            </label>
                            <br />
                            <input type='password' id='passWord' placeholder='Password' className='password-input' onChange={this.onChangePassword} value={password}/>
                        </div>
                    
                        
                        <button type='submit' className='login-btn'> Login </button>
                        {
                            notFound  && 
                            <p className='not-found'>*Username is not found</p>
                        }
                    </form>
                </div>
            
            </div>
        )
        
    }
    
}

export default LoginForm