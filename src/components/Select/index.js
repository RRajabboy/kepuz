import { useState } from "react"
import { AnimatePresence, motion as m } from "framer-motion"
import HoverOutSide from "../../hook/hoverOutSide"

import "./index.scss"

const motionSetting = {
    animate: {
        y: 0,
        opacity: 1
    },
    initial: {
        y: -20,
        opacity: 0
    },
    exit: {
        y: -10,
        transition: {
            duration: 0.05
        }
    }
}

export default function Select({ selectName, values, name, setValue }) {

    const [ openValue, setOpenValue ] = useState(false)
    const [ selectValue, setSelectValue ] = useState()

    const selectHandler = ({ title, value }) => {
        setSelectValue(title)
        setValue({name, value})
    }

    return <m.div className='main-select' ref={HoverOutSide(setOpenValue)}>
        <div className="select-name">
            <p>{ selectValue ? selectValue : <span className="text-slate-400">{selectName}</span>}</p>
            <div className={"flex " + (openValue ? "rotate-180" : "")}><box-icon name='chevron-down'></box-icon></div>
            
        </div>
        <AnimatePresence>
            { openValue && <m.div className="drop" animate={motionSetting.animate} initial={motionSetting.initial} exit={{...motionSetting.initial, ...motionSetting.exit}}>
                <div className="values shadow-lg divide-y-[1px] divide-slate-400/30">{
                    values.map((item, i) => {
                        return item.value === selectValue 
                        ? 
                        <span key={i}>
                            <span>{item.title}</span>
                            <div className="absolute flex right-3">
                                <box-icon name='check'></box-icon>
                            </div>
                        </span>
                        : 
                        <span onClick={() => selectHandler(item)}>{item.title}</span>
                    })
                }</div>
            </m.div> }
        </AnimatePresence>
    </m.div>
}
