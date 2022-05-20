import { useState, useEffect } from 'react'
import words from '../utils/parser'

const FilteredList = ({ term }) => {
  const [wordsList, setWordsList] = useState([])
  useEffect(() => {
    setWordsList(words)
  }, [])

  useEffect(() => {
    if (term?.npl && term?.npl.length > 0) {
      term.npl.forEach((element) => {
        setWordsList((prevState) =>
          prevState.filter((word) => word.indexOf(element) === -1)
        )
      })
    }

    if (term?.pl.length > 0) {
      term.pl.forEach((element) => {
        setWordsList((prevState) =>
          prevState.filter((word) => word.includes(element))
        )
      })
    }

    //----------------L I P------------------

    let expression = '.....'
    if (/[а-я]/.test(term?.lip)) {
      expression = term?.lip.join('')
    }

    const regexObj = new RegExp(expression)

    if (!term?.lip.includes({ value: '.' })) {
      setWordsList((prevState) =>
        prevState.filter((word) => regexObj.test(word))
      )
    }
    //--------------------------------------------
  }, [term])

  return (
    <div>
      {wordsList.slice(0, 200).map((w) => {
        return <span key={Math.random()}>{w}, </span>
      })}
    </div>
  )
}

export default FilteredList
