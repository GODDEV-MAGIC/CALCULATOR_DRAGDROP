import React, { useState, useCallback } from 'react'
import { Dustbin } from './Dustbin'
import { Box } from './Box'
import { ItemTypes } from './ItemTypes'
import update from 'immutability-helper'
import { Dropdown } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import './Container.css';

export const Container = () => {
  
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.BOX], lastDroppedItem: null },
    { accepts: [ItemTypes.BOX], lastDroppedItem: null }
  ])
  const [boxes] = useState([
    { name: '1', type: ItemTypes.BOX },
    { name: '2', type: ItemTypes.BOX },
    { name: '3', type: ItemTypes.BOX },
    { name: '4', type: ItemTypes.BOX },
    { name: '5', type: ItemTypes.BOX },
    { name: '6', type: ItemTypes.BOX },
    { name: '7', type: ItemTypes.BOX },
    { name: '8', type: ItemTypes.BOX },
    { name: '9', type: ItemTypes.BOX },
    { name: '10', type: ItemTypes.BOX }
  ])
  const [msgVisible, setMsgVisible] = useState('none');
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState('');
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNames, dustbins],
  )
  const friendOptions = [
    {
      key: '+',
      text: '+',
      value: '+',
    },
    {
      key: '-',
      text: '-',
      value: '-',
    },
    {
      key: '*',
      text: '*',
      value: '*',
    },
    {
      key: '/',
      text: '/',
      value: '/',
    },
  ]
  function onCalc(e) {
    e.preventDefault();
    console.log('Operator is : ', operator);
    //console.log('Selected numbers are: ', dustbins[0].lastDroppedItem.name, dustbins[1].lastDroppedItem.name);
    let value;
    if(dustbins[0].lastDroppedItem == null ||  dustbins[1].lastDroppedItem == null){
      return;
    }
    switch(operator){
      case '+':
        value = Number(dustbins[0].lastDroppedItem.name) + Number(dustbins[1].lastDroppedItem.name) 
        break;
      case '-':
        value = Number(dustbins[0].lastDroppedItem.name) - Number(dustbins[1].lastDroppedItem.name) 
        break;
      case '*':
        value = Number(dustbins[0].lastDroppedItem.name) * Number(dustbins[1].lastDroppedItem.name) 
        break;
      case '/':
        value = Number(dustbins[0].lastDroppedItem.name) / Number(dustbins[1].lastDroppedItem.name)
        value = value.toFixed(1)
        break;
    }
    dustbins[0].lastDroppedItem = null
    dustbins[1].lastDroppedItem = null
    setAnswer(value)
    setMsgVisible('block')
  }
  return (
    <div>
      <p style = {{textAlign: 'center', fontSize: '20px', display: msgVisible}}>It's good, try again!</p>
      <div style={{ overflow: 'hidden', clear: 'both', display: 'flex', justifyContent: 'center', height: '400px', marginTop: '50px'}}>
          <Dustbin
            accept={dustbins[0].accepts}
            lastDroppedItem={dustbins[0].lastDroppedItem}
            onDrop={(item) => handleDrop(0, item)}
            key={0}
          />
          <span style = {{padding: '30px 30px', width: '100px', marginTop: '30px'}}>
            <Dropdown
              className = 'operator'
              style = {{fontSize: '5rem'}}
              options={friendOptions}
              defaultValue={friendOptions[0].value}
              onChange={(e, d) =>  setOperator(d.value)}
            />
          </span>
          <Dustbin
            accept={dustbins[1].accepts}
            lastDroppedItem={dustbins[1].lastDroppedItem}
            onDrop={(item) => handleDrop(1, item)}
            key={1}
          />
          <Button onClick = {onCalc} style = {{height: '60px', marginTop: '40px', fontSize: '5rem', padding: '30px 30px'}}>=</Button>
          <div class = 'answerDiv'>
            {answer}
          </div>
      </div>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {boxes.map(({ name, type }, index) => (
          <Box
            name={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}
