const Feedback = ({ message, type }) => {
    if(message === null) {
        return null
    }

    return (
        <div className={type === 'success' ? 'success' : 'error'}>
            {message}
        </div>
    )
}

export default Feedback;