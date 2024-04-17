import React from "react";
function TodoItem({ text, completed, onComplete, onDelete }) {

    const [checked, setChecked] = React.useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    }

    const checkboxClass = checked ? 'list-checked-active' : 'list-checked-inactive'
    return (
        <li>
            <span>
                <input type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                    onClick={onComplete}
                />
                {completed}
            </span>
            <p className={checkboxClass}>{text}</p>
            <span
                onClick={onDelete}
            >X</span>
        </li>
    )
}

export { TodoItem };