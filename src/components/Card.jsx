import { RiDeleteBin2Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import './card.css'
export default function Card(props) {
    return (
        <div className='tasks-container'>
            <input
                onClick={() => props.handleComplete(props.id)}
                className="card-status"
                type="checkbox"
                name=""
                value={props.completed}
                id={props.id}
            />
            <label className='card-label' htmlFor={props.id}>{props.completed && <FaCheck />}</label>
            <p className={`${props.completed && 'strike-through'}`}>{props.desc}</p>
            <button onClick={() => props.handleDelete(props.id)} className='delete-task'><RiDeleteBin2Line /></button>
        </div>
    )
}