import React from 'react'
import { useDrag } from 'react-dnd'
const style = {
  width: '3em',
  height: '3em',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '2rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
  fontSize: '2rem',
  textAlign: 'center',
}
export const Box = ({ name, type, isDropped }) => {
  const [{ opacity }, drag] = useDrag({
    item: { name, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {name}
    </div>
  )
}
