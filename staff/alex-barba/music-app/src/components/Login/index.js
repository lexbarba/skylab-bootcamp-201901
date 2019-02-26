import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Feedback from '../Feedback'

export default function Login({feedback, onLogin}) {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const handleFormSubmit = event => {
        event.preventDefault()

        onLogin(email, password)
    }


    return (
        <section className="login container margin-top" >
            <div className="columns is-mobile is-centered">
                <form className="login__form column is-half-widescreen is-half-tablet is-three-quarters-mobile is-centered" onSubmit={handleFormSubmit}>
                    <h4 className="subtitle is-4">Login</h4>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-small is-rounded" type="email" name="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input is-small is-rounded" type="password" name="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field is-grouped btn_grp">
                        <p className="control">
                            <button className="button is-success is-small is-rounded" type="submit">
                                Login
                        </button>
                        </p>
                        <p className="control">
                            <Link to="/register" className="button is-outlined is-small is-rounded">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
            {feedback && <Feedback message={feedback} />}
        </section>
    )
}