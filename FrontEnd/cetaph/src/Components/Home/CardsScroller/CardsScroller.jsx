import { useRef, useState } from 'react'
import { useEffect } from 'react'
import Card from '../../Card/Card'
import './cards-scroller.scss'
import ScrollContainer from 'react-indiana-drag-scroll'
import axios from 'axios'
import Loading from '../../Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { setLanding } from '../../../Redux/actions/landing'
const CardsScroller = () => {
  const slider = useRef(null)

  const dispatch = useDispatch()
  const landingAlbums = useSelector(({ main }) => main.landing).slice(0, 1)

  useEffect(() => {
    dispatch(setLanding())
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
    <>
      {landingAlbums?.length > 0 ? (
        <div id="main-slider-container">
          <i
            className="bi bi-arrow-left slider-icon left"
            onClick={slideLeft}
          ></i>
          <ScrollContainer
            className="scroll-container"
            hideScrollbars={false}
            vertical={false}
            innerRef={slider}
          >
            <div className="wrapper">
              {landingAlbums.map((disk, index) => {
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
      ) : (
        <Loading text={'Loading...'} />
      )}
    </>
  )
}

export default CardsScroller
