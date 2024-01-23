import { useEffect, useState } from 'react';
import './App.css';
import Input from './Components/Input/Input';
import Button from './Components/Button/Button';
import { addTodo, loadTodos } from './store/reducers/todolist';
import { useDispatch, useSelector } from 'react-redux';
import TodoCard from './Components/TodoCard/TodoCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus } from 'react-bootstrap-icons';
import DateComponent from './Components/Date/Date';

function App() {
  const date = new Date()
  const data = useSelector((state) => state.content)
  const dispatch = useDispatch()
  const [isFiltered, setIsFiltered] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [inputData, setInputData] = useState('')
  const [yearInput, setYearInput] = useState(date.getFullYear())
  const [monthInput, setMonthInput] = useState(date.getMonth() + 1)
  const [dayInput, setDayInput] = useState(date.getUTCDate())

  useEffect(() => {
    dispatch(loadTodos())
    setFilteredData(data)
  }, []);

  useEffect(() => {
    let keyDownHandled = false;
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !keyDownHandled) {
        if (inputData.length > 0) {
          dispatch(addTodo({ id: Math.floor(Math.random() * 100000), name: inputData, completed: false, date: `${yearInput}/${monthInput}/${dayInput}` }))
          setInputData('')
          keyDownHandled = true;
        } else {
          toast(
            'Please enter a title!', {
            autoClose: 1000,
            theme: 'light',
            hideProgressBar: true,
            position: 'bottom-left',
          }
          )
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      keyDownHandled = false;
    }
  } , [inputData])

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  useEffect(() => {
    document.querySelector('.content').scrollTo(0, document.querySelector('.content').scrollHeight)
  }, [filteredData])

  useEffect(() => {
    if (isFiltered) {
      setFilteredData(
        data.filter(item => {
          return item.date === `${yearInput}/${monthInput}/${dayInput}`
        })
      )
    } else {
      setFilteredData(data)
    }
  }, [data, isFiltered, yearInput, monthInput, dayInput])


  return (
    <div className="App">
      <h1>TodoList Project</h1>
      <div className='form'>
        <div className='InputForm'>
          <Input className='input-with-btn' data={inputData} setData={setInputData} />
          <Button className='btn-in-input' click={() =>
            inputData.length > 0 ?
              (
                dispatch(addTodo({ id: Math.floor(Math.random() * 100000), name: inputData, completed: false, date: `${yearInput}/${monthInput}/${dayInput}` })),
                setInputData('')
              )
              :
              toast(
                'Please enter a title!', {
                autoClose: 1000,
                theme: 'light',
                hideProgressBar: true,
                position: 'bottom-left',
              }
              )} >
            <Plus size={25} />
          </Button>
        </div>
        <DateComponent year={yearInput} setYear={setYearInput} month={monthInput} setMonth={setMonthInput} day={dayInput} setDay={setDayInput} />
      </div>
      <div className='filterDateContainer'>
        <label>Filter by selected Date</label>
        <input className='filterDate' onChange={(e) => {
          e.target.checked ? setIsFiltered(true) : setIsFiltered(false)
        }} type='checkbox' />
      </div>
      <div className='content'>
        {filteredData.length === 0 ? <h1>Add a Todo</h1> : (
          filteredData.map((item, index) => {
            return <TodoCard date={item.date} id={item.id} completed={item.completed} name={item.name} key={index} />
          })
        )}
      </div>
      <ToastContainer />
    </div >
  );
}

export default App;
