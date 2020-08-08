import React from 'react'
import { useDrop } from 'react-dnd'
const style = {
  height: '2em',
  width: '2em',
  color: 'white',
  textAlign: 'center',
  fontSize: '5rem',
  lineHeight: 'normal',
  float: 'left',
}
export const Dustbin = ({ accept, lastDroppedItem, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = isOver && canDrop
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {isActive
        ? ''
        :lastDroppedItem && lastDroppedItem['name']}
    </div>
  )
}
