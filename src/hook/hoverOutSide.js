import { useEffect, useRef } from 'react'

export default function HoverOutSide(setOpenValue) {

    const cartRef = useRef()

    useEffect(() => {
        function outside(e) {
            if(!cartRef.current?.contains(e.target)){
                setOpenValue(false)
            } else {
                setOpenValue(true)
            }
        }
        document.addEventListener("mousemove", outside)

        return () => {
            document.removeEventListener("mousemove", outside)
        }
    }, [])
    
    return cartRef
}
