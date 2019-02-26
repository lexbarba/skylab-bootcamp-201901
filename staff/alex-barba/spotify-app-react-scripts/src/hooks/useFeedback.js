import {useEffect, useState} from 'react';

export default function useFeedback( props ) {
    const [feedback, setFeedback] = useState(null)

    useEffect(() => {
        setFeedback(props.feedback)
    }, [props.feedback])


    return {feedback}
}