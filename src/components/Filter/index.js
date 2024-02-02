import { useState } from 'react'
import { motion as m } from 'framer-motion'
import Select from '../Select'

import './index.scss'

const selectValues = [
  {
    title: "Yes",
    value: true
  },
  {
    title: "No",
    value: false
  }
]

const motionSetting = {
  animate: {
    y: 0,
    opacity: 1,
    scale: 1
  },
  initial: {
    y: -10 + "%",
    opacity: 0,
    scale: 0.99
  },
  exit: {
    y: -10 + "%",
    opacity: 0,
    scale: 0.99
  }
}

export default function Filter({ fetch }) {

  const { changeParams } = fetch
  const [ filter, setFilter ] = useState({})

  const delayedParams = () => {
    const timer = setTimeout(() => {
        changeParams(filter, true)
        console.log("chagdg");
    }, 1000)
    return () => clearTimeout(timer)
  }

  const changeHandler = (e) => {
    const { name, value } = e
    setFilter(prev => {
      const search = {
          ...prev,
          [name]: value
      }
      delayedParams()
      return search
    })
  }

  return <m.div 
    className="top-filter"
    animate={motionSetting.animate}
    initial={motionSetting.initial}
    exit={motionSetting.exit}
    transition={{
      duration: 0.15,
    }}
  >
    <label>
      <span>Title</span>
      <input type="text" name='title' onChange={(e) => changeHandler(e.target)} placeholder='Title' />
    </label>
    <label>
      <span>Checker</span>
      <Select selectName="Checker" setValue={changeHandler} name="has_checker" values={selectValues} />
    </label>
    <label>
      <span>Solution</span>
      <Select selectName="Solution" setValue={changeHandler} name="has_solution" values={selectValues} />
    </label>
  </m.div>
}
