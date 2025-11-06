import ReactLenis from '@studio-freight/react-lenis'
import React from 'react'

const SmoothScrolling = ({children}) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.3, smoothTouch: true }}>
        {children}
    </ReactLenis>
  )
}

export default SmoothScrolling