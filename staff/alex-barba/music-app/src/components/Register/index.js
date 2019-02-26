import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Feedback from '../Feedback'
import ModalRegistration from '../ModalRegistration'

export default function Register({modal, feedback, onRegistration, onToLogin}) {

    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordConfirmation, setPasswordConfirmation] = useState(null)

    const handleOnRegistration = event => {
        event.preventDefault()

        onRegistration(name, surname, email, password, passwordConfirmation)
    }

    const handleCloseModal = () => {

        onToLogin()
    }

    return (
    <section className="register container margin-top">
        <div className="columns is-mobile is-centered">
            <form onSubmit={handleOnRegistration} className="register__form column is-half-widescreen is-half-tablet is-three-quarters-mobile is-centered">
                <h4 className="subtitle is-4">Register</h4>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small is-rounded" type="text" name="name" placeholder="Name" required onChange={e => setName(e.target.value)} />
                        <span className="icon is-small is-left">
                            <i className="far fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small is-rounded" type="text" name="surname" placeholder="Surame" required onChange={e => setSurname(e.target.value)} />
                        <span className="icon is-small is-left">
                            <i className="far fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
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
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small is-rounded" type="password" name="password-confirmation" placeholder="Confirm password" required onChange={e => setPasswordConfirmation(e.target.value)}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field is-grouped btn_grp">
                    <p className="control">
                        <button className="button is-success is-small is-rounded" type="submit">
                            Register
                    </button>
                    </p>
                    <p className="control">
                        <Link to="/login" className="button is-outlined is-small is-rounded">Login</Link>
                    </p>
                </div>
            </form>
        </div>
        {feedback && <Feedback message={feedback} />}
        {modal && <ModalRegistration closeModal={handleCloseModal} />}
    </section>
    )
}