import { useRef, useState } from 'react'
import { useEffect } from 'react'
import Card from '../../Card/Card'
import './cards-scroller.scss'
import ScrollContainer from 'react-indiana-drag-scroll'
import { motion, useMotionValue } from 'framer-motion'
import axios from 'axios'

const CardsScroller = ({ props }) => {
  const slider = useRef(null)

  const handleWheel = (e) => {
    let [x, y] = [e.deltaX, e.deltaY]
    let magnitude

    if (x === 0) {
      magnitude = y > 0 ? -30 : 30
    } else {
      magnitude = x
    }
    slider.current.scrollBy({
      left: magnitude,
    })
  }
  const [disks, setDisks] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:9000/api/v1/album')
      .then((res) => {
        console.log(res.data)
        setDisks(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    const el = slider.current
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return
        e.preventDefault()
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'smooth',
        })
      }
      el.addEventListener('wheel', onWheel)
      return () => el.removeEventListener('wheel', onWheel)
    }
  }, [])
  //Scroll with mouse wheel
  useEffect(() => {}, [])
  const slideLeft = () => {
    slider.current.scrollTo({
      left: slider.current.scrollLeft - 300,
      behavior: 'smooth',
    })

    // slider.current.scrollLeft = slider.current.scrollLeft + 250;
  }

  const slideRight = () => {
    slider.current.scrollTo({
      left: slider.current.scrollLeft + 300,
      behavior: 'smooth',
    })
  }
  return (
    <div id="main-slider-container">
      <i className="bi bi-arrow-left slider-icon left" onClick={slideLeft}></i>
      <ScrollContainer
        className="scroll-container"
        hideScrollbars={false}
        vertical={false}
        innerRef={slider}
        onWheel={handleWheel}
      >
        <div className="wrapper">
          {disks.map((disk, index) => {
            return (
              <div className="slider-card" key={index}>
                <Card key={'card' + index} color={'white'} data={disk} />
              </div>
            )
          })}
        </div>
      </ScrollContainer>
      <i
        className="bi bi-arrow-right slider-icon right"
        onClick={slideRight}
      ></i>
    </div>
  )
}

export default CardsScroller
