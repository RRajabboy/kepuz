import { useState } from 'react'
import { motion as m } from 'framer-motion'
import Select from '../Select'

import './index.scss'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const [ filter, setFilter ] = useState({})

  const changeHandler = (e) => {
    let { name, value } = e
    value = value === "" ? null : value

    setFilter(prev => {
      const isHasFilter = Object.keys(prev).length === 0 ? true : false
      const toPage = isHasFilter ? 1 : prev.page

      const search = {
          ...prev,
          [name]: value,
          page: toPage,
      }
      return search
    })
  }

  const submit = () => {
    navigate("/" + filter.page)
    changeParams(filter)
  }

  return <m.div 
    className="top-filter container"
    animate={motionSetting.animate}
    initial={motionSetting.initial}
    exit={motionSetting.exit}
    transition={{
      duration: 0.15,
    }}
  >
    <div className="filter-items">
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
    </div>
    <div onClick={submit} className="bg-indigo-800/80 text-white mt-5 px-4 cursor-pointer py-1.5 flex  float-right rounded-md hover:bg-indigo-800/90 transition">
      <span>Qidirish</span>
      <box-icon name='search-alt-2' style={{fill: "white", transform: "scale(0.85)"}} size="sm"></box-icon>
    </div>
  </m.div>
}
