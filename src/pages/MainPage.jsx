import { useState } from 'react'
import RICIBs from 'react-individual-character-input-boxes'
import FilteredList from '../components/FilteredList'
import classes from './MainPage.module.css'

const MainPage = () => {
  const [lettersInPlace, setLettersInPlace] = useState([
    { value: '.' },
    { value: '.' },
    { value: '.' },
    { value: '.' },
    { value: '.' },
  ])
  const [notPresentLetters, setNotPresentLetters] = useState([])
  const [presentLetters, setPresentLetters] = useState([])
  const [term, setTerm] = useState(null)

  const lettersInPlaceHandler = (string) => {
    if (/[а-я, А-Я]/.test(string)) {
      const res = string.toLowerCase().split('')
      setLettersInPlace(res)
    }
  }

  const notPresentLettersHandler = (string) => {
    const res = string.toLowerCase().split('')
    setNotPresentLetters(res)
  }

  const presentLettersHandler = (string) => {
    const res = string.toLowerCase().split('')
    setPresentLetters(res)
  }

  const submitHandler = () => {
    setTerm({
      lip: lettersInPlace,
      npl: notPresentLetters,
      pl: presentLetters,
    })
    console.log('TERM', term)
  }

  const resetHandler = () => {
    setLettersInPlace([
      { value: '.' },
      { value: '.' },
      { value: '.' },
      { value: '.' },
      { value: '.' },
    ])
    setPresentLetters([])
    setNotPresentLetters([])
    setTerm(null)
  }

  return (
    <div>
      <h2>Буквы на месте</h2>
      <RICIBs
        amount={5}
        autoFocus
        handleOutputString={lettersInPlaceHandler}
        inputProps={lettersInPlace}
        inputRegExp={/^[а-я А-Я .]$/}
        style={{ background: 'red' }}
      />
      <button className={classes.resetButton} onClick={resetHandler}>
        Сброс
      </button>
      <h2>Отсутствующие буквы</h2>
      <RICIBs
        amount={25}
        // autoFocus
        handleOutputString={notPresentLettersHandler}
        inputProps={notPresentLetters}
        inputRegExp={/^[а-я, А-Я]$/}
      />
      <h2>Присутствующие буквы не на месте</h2>
      <RICIBs
        amount={25}
        // autoFocus
        handleOutputString={presentLettersHandler}
        // inputProps={presentLetters}
        inputRegExp={/^[а-я, А-Я]$/}
      />
      <button className={classes.submitButton} onClick={submitHandler}>
        Искать
      </button>
      <FilteredList term={term} />
    </div>
  )
}

export default MainPage
