import React, {useState, Fragment, useEffect} from 'react'
import Feedback from '../Feedback'
import logic from '../../logic'

export default function Search(props) {

    const [query, setQuery] = useState(null)
    const [name, setName] = useState(null)
    const [feedback, setFeedback] = useState(null)


    const handleOnSearch = (event) => {
       
        event.preventDefault()

        const {onToSearch} = props

        onToSearch(query)
    }

    const handleOnLogout = () => {
        const {onToLogout} = props

        onToLogout()
    }

    const handleOnFavourites = () => {
        const {onToFavourites} = props

        onToFavourites()
    }

    useEffect(() => {
        setFeedback(props.feedback)
        setName(props.user)
    }, [props])

    return (
    <section className="search margin-top">
        <div className="level is-mobile">
        <div className="level-item"></div>
        {logic.isUserLoggedIn ? <Fragment>
        <div className="level-item">
            <h4 className="subtitle is-4" >Welcome, {name} !</h4>
        </div>
        <div className="level-item">
                <button onClick={handleOnFavourites} className="button is-rounded is-small search__logout">Favourites &nbsp;<i className="fas fa-heart"></i></button>
        </div> </Fragment>: <Fragment>
        <div className="level-item">
            <h4 className="subtitle is-4" >Welcome guest!</h4>
        </div>
        <div className="level-item">
        </div> 
        </Fragment>}
            <div className="level-item">
                <button onClick={handleOnLogout} className="button is-rounded is-small search__logout"><i className="fas fa-sign-out-alt"></i></button>
            </div>
            <div className="level-item"></div>
        </div>
        <div className="columns is-mobile is-centered">
            <div className="column is-two-thirds-tablet is-three-quarters-mobile is-centered"> 
                <form onSubmit={handleOnSearch} className="field has-addons has-addons-centered">
                    <div className="control has-icons-left is-expanded">
                        <input onChange={e => setQuery(e.target.value)} className="input is-small is-rounded" placeholder="Find an artist" type="text" name="query"></input>
                        <span className="icon is-small is-left">
                            <i className="fas fa-music"></i>
                        </span>
                    </div>
                    <div className="control">
                        <button className="button is-small is-rounded is-success"type="submit">Find!</button>
                    </div>
                </form>
            </div>
        </div>
        {feedback && <Feedback message={feedback} />}
    </section>
    )
}