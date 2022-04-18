import { Component } from 'react';
import ErrorGif from '../errors/error.gif'



class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
        this.setState({
            error: true
        })
    }

    render() {
        const errorGif = <img style={{ margin: '0 auto', display: 'block', width: '200px', height: '200px' }} src={ErrorGif} alt='Loading...' />
        
        if (this.state.error) {
            return errorGif  
        }

        return this.props.children
    }
}

export default ErrorBoundary