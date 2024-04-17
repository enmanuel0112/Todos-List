import React from "react";
import { FiSearch } from "react-icons/fi";

function TodoSearch({ filterTodo, setFilterTodos }) {
    return (
        <label>
            <input type="text" placeholder="Search..."
                value={filterTodo}
                onChange={(event) => {
                    setFilterTodos(event.target.value)
                }}
            />
            <span>
                <FiSearch
                    onClick={() => {
                        console.log(`${filterTodo}`);
                    }}
                />
            </span>

        </label>
    )
}


export { TodoSearch };