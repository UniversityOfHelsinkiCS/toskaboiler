import React, { useState, useMemo } from 'react'
import {
  AutoSizer, Table, Column, SortDirection,
} from 'react-virtualized'
import { Input } from 'semantic-ui-react'

const VirtualizedTable = ({
  data, columns, rowHeight = 50, headerHeight = 30, searchable,
}) => {
  const [sortBy, setSortBy] = useState(null)
  const [sortDirection, setSortDirection] = useState(SortDirection.ASC)
  const [filter, setFilter] = useState('')

  const sortedData = useMemo(() => {
    const selectedColumn = columns.find(({ key }) => sortBy === key)
    if (!selectedColumn || !selectedColumn.sort) return data
    const result = [...data].sort(selectedColumn.sort)
    if (sortDirection === SortDirection.ASC) result.reverse()
    return result
  }, [sortBy, sortDirection])

  const filteredData = useMemo(() => sortedData.filter((params) => {
    let flag = false
    Object.values(params).forEach((value) => {
      if (flag) return
      if (!filter || (value && String(value).trim().toLowerCase().includes(filter.trim().toLowerCase()))) {
        flag = true
      }
    })
    return flag
  }), [sortBy, sortDirection, filter])

  const handleFilterChange = (_, { value }) => setFilter(value)

  return (
    <div style={{ flex: 1 }}>
      { searchable && <Input onChange={handleFilterChange} value={filter} placeholder="Search..." icon="search" /> }
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={searchable ? height - 40 : height}
            width={width}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            rowCount={filteredData.length}
            rowGetter={({ index }) => filteredData[index]}
            sortDirection={sortDirection}
            sortBy={sortBy}
            sort={({ sortBy, sortDirection }) => {
              setSortBy(sortBy)
              setSortDirection(sortDirection)
            }}
          >
            {
              columns.map(({ label, key, renderCell }) => (
                <Column
                  key={key}
                  label={label}
                  dataKey={key}
                  width={Math.floor(width / columns.length)}
                  cellRenderer={({ rowData }) => renderCell(rowData)}
                  onClick={() => setSortBy(key)}
                />
              ))
            }
          </Table>
        )}
      </AutoSizer>
    </div>
  )
}

export default VirtualizedTable
