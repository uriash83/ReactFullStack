import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments'


class Header extends Component {
    rednerContent(){
        console.log(this.props.auth)
       switch(this.props.auth){
           case null:
                return;
           case false:
                return(
                    <li><a href="/auth/google">Sign up</a></li>
                );
           default:
                return(// gość zamiast () używa [] bo to jest lista
                    <div>
                    <li><Payments/></li>
                    <li style={{margin: "0 10px"}}>
                        Credits: {this.props.auth.credits}
                    </li>
                    <li><a href="/api/logout">Logout</a></li>
                    </div>
                );
       }     
    }

    render(){     
        
        return(
            <nav>
                <div className='nav-wrapper'>
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.rednerContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}


//było function mapStateToProps() ...
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Header);