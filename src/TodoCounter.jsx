function TodoCounter({ total, completed }) {
    return (
        <>
            <div className="title-todo">
                <h1>You have completed <span>{completed} </span>of  <span>{total}</span></h1>
                <span >TODOs</span>
            </div>

        </>


    )
}


export { TodoCounter };