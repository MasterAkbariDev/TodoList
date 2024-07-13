import React from 'react'
import Button from '../Button/Button'
import './TodoCard.css'
import { changeTodo, editTodo, deleteTodo } from '../../store/reducers/todolist'
import { useDispatch } from 'react-redux'
import { CheckCircle, PencilFill, Trash } from 'react-bootstrap-icons'

const TodoCard = (props) => {
  const date = new Date()
  const dispatch = useDispatch()
  const TodoDate = props.date
  const YesterDay = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getUTCDate() - 1}`
  const Today = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getUTCDate()}`
  const Tommorow = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getUTCDate() + 1}`
  let order;

  return (
    <div style={{ order: order }} data-id={props.id} className={`TodoCard ${props.completed ? 'Completed' : ''}`}>
      <div className='name'>
        <h4>{props.name}</h4>
      </div>
      <div className='right-side'>
        <div className='Devider'></div>
        <p className='date-todo'>{TodoDate === Today ? "Today" : TodoDate === Tommorow ? "Tommorow" : TodoDate === YesterDay ? "Yesterday" : TodoDate}</p>
        <div className="Todo-Buttons">
          <Button click={() => dispatch(changeTodo(props.id))} className='succeed'><CheckCircle size={20} /></Button>
          <Button click={() => dispatch(editTodo(props.id))} className='primary'><PencilFill size={20} /></Button>
          <Button click={() => dispatch(deleteTodo(props.id))} className='danger'><Trash /></Button>
        </div>
      </div>
    </div>
  )
}

export default TodoCard