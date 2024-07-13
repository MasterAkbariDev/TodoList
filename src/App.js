import { useEffect, useState } from 'react';
import './App.css';
import Input from './Components/Input/Input';
import Button from './Components/Button/Button';
import { addTodo, loadTodos } from './store/reducers/todolist';
import { useDispatch, useSelector } from 'react-redux';
import TodoCard from './Components/TodoCard/TodoCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus, Search } from 'react-bootstrap-icons';
import DateComponent from './Components/Date/Date';

function App() {
  const date = new Date();
  const data = useSelector((state) => state.content);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const [inputData, setInputData] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [yearInput, setYearInput] = useState(date.getFullYear());
  const [monthInput, setMonthInput] = useState(date.getMonth() + 1);
  const [dayInput, setDayInput] = useState(date.getUTCDate());
  const [filter, setFilter] = useState({ isFiltered: false, isSearched: false });

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const sortTodos = (todos) => {
      const activeTodos = todos.filter(todo => !todo.completed).sort((a, b) => new Date(b.date) - new Date(a.date));
      const completedTodos = todos.filter(todo => todo.completed).sort((a, b) => new Date(b.date) - new Date(a.date));
      return [...activeTodos, ...completedTodos];
    };

    let filtered = data;
    if (filter.isFiltered) {
      filtered = filtered.filter(item => item.date === `${yearInput}/${monthInput}/${dayInput}`);
    }
    if (filter.isSearched && searchTerm.length > 0) {
      filtered = filtered.filter(item => item.name.includes(searchTerm));
    }
    setFilteredData(sortTodos(filtered));
  }, [data, filter.isFiltered, filter.isSearched, yearInput, monthInput, dayInput, searchTerm]);

  const searchTodo = () => {
    setSearchTerm(inputData);
    setFilter(prev => ({ ...prev, isSearched: inputData.length > 0 }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputData.length > 0) {
      dispatch(addTodo({
        id: Math.floor(Math.random() * 100000),
        name: inputData,
        completed: false,
        date: `${yearInput}/${monthInput}/${dayInput}`
      }));
      setInputData('');
    } else if (e.key === 'Enter') {
      toast('Please enter a title!', {
        autoClose: 1000,
        theme: 'light',
        hideProgressBar: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputData]);

  return (
    <div className="App">
      <h1>TodoList Project</h1>
      <div className='form'>
        <div className='InputForm'>
          <Input className='input-with-btn' data={inputData} setData={setInputData} />
          <Button click={searchTodo}>
            <Search size={25} />
          </Button>
          <Button className='btn-in-input succeed' click={() => {
            if (inputData.length > 0) {
              dispatch(addTodo({
                id: Math.floor(Math.random() * 100000),
                name: inputData,
                completed: false,
                date: `${yearInput}/${monthInput}/${dayInput}`
              }));
              setInputData('');
            } else {
              toast('Please enter a title!', {
                autoClose: 1000,
                theme: 'light',
                hideProgressBar: true,
                position: 'bottom-left',
              });
            }
          }}>
            <Plus size={25} />
          </Button>
        </div>
        <DateComponent year={yearInput} setYear={setYearInput} month={monthInput} setMonth={setMonthInput} day={dayInput} setDay={setDayInput} />
      </div>
      <div className='filterDateContainer'>
        <label>Filter by selected Date</label>
        <input className='filterDate' onChange={(e) => {
          setFilter(prev => ({ ...prev, isFiltered: e.target.checked }));
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
    </div>
  );
}

export default App;
