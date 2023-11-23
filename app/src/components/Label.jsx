/* eslint-disable react/prop-types */
function Label(props) {
    return (
        <>
            <label htmlFor={props.id} className="font-semibold">
                {props.text}:
            </label>
            <input
                type={props.type}
                id={props.id}
                name={props.id}
                autoComplete={props.autoComplete}
                className="border-2 border-black rounded pl-2 w-full"
                minLength={props.minLength ? props.minLength : 3}
            />
        </>
    );
}

export default Label;
