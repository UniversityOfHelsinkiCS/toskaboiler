import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

import MessageComponent from 'Components/MessageComponent'
import VirtualizedTable from 'Components/VirtualizedTable'

const generateData = (amount) => {
  const res = []
  for (let i = 0; i < amount; i++) {
    res.push({
      name: `name ${i}`,
      left: i % 1000,
    })
  }
  return res
}

export default () => {
  const [greetings, setGreetings] = useState(['Hello'])

  const nextGreeting = `${greetings[greetings.length - 1]}!`

  const columns = [
    {
      label: 'Name',
      key: 'name',
      renderCell: ({ name }) => name,
      sort: (a, b) => a.name.localeCompare(b.name),
    },
    {
      label: 'Left',
      key: 'left',
      renderCell: ({ left }) => <span style={{ color: 'red' }}>{left}</span>,
      sort: (a, b) => a.left - b.left,
    },
    {
      label: 'Do something',
      key: 'button',
      renderCell: ({ name }) => <Button color="purple" onClick={() => console.log(`Clicked ${name}!`)}>CLICK</Button>,
    },
  ]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div>
        {greetings.join(' ')}
        <br />
        <Button color="purple" onClick={() => setGreetings([...greetings, nextGreeting])}>
          {nextGreeting}
        </Button>
      </div>
      <MessageComponent />
      <VirtualizedTable searchable data={generateData(10000)} columns={columns} />
    </div>
  )
}
