import { useRef, useState } from 'react'
import { useEffect } from 'react'
import Card from '../../Card/Card'
import './cards-scroller.scss'
import ScrollContainer from 'react-indiana-drag-scroll'
import Loading from '../../Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getLanding } from '../../../Redux/actions/landing'
import { useLocation } from 'react-router'

const CardsScroller = () => {
  const slider = useRef(null)
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const landingAlbums = useSelector(({ main }) => main.landing)

  useEffect(() => {
    dispatch(getLanding())
  }, [])
  //Scroll with mouse wheel
  useEffect(() => {}, [])

  const slideLeft = () => {
    slider.current.scrollTo({
      left: slider.current.scrollLeft - 300,
      behavior: 'smooth',
    })
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
          {landingAlbums.length > 3 && (
            <i
              className="bi bi-arrow-left slider-icon left"
              onClick={slideLeft}
            ></i>
          )}
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
                    <Card key={'card' + index} path={pathname} data={disk} />
                  </div>
                )
              })}
            </div>
          </ScrollContainer>
          {landingAlbums.length > 3 && (
            <i
              className="bi bi-arrow-right slider-icon right"
              onClick={slideRight}
            ></i>
          )}
        </div>
      ) : (
        <Loading text={'Loading...'} path={pathname} />
      )}
    </>
  )
}

export default CardsScroller
