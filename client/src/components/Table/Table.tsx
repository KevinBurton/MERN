import React from 'react';
import { Column, usePagination, useTable, useRowSelect } from 'react-table';

interface ITable<T extends object> {
  columns: Column<T>[]
  data: T[],
  setPosition?: (lat: number, lng: number) => void}

export function Table<T extends object>({ columns, data, setPosition }: ITable<T>) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },
    usePagination,
    useRowSelect
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>): void => {
                const parentElement = event.currentTarget.parentElement;
                const headerElement = event.currentTarget.parentElement && event.currentTarget.parentElement.parentElement ? event.currentTarget.parentElement.parentElement.children[0].children[0] : null;
                const currentElement = event.currentTarget;
                if(setPosition &&
                   headerElement != null &&
                   parentElement != null &&
                   headerElement.children.length >= 8 &&
                   headerElement.children[6].innerHTML.includes('Latitude') &&
                   headerElement.children[7].innerHTML.includes('Longitude') &&
                   currentElement.cells.length >= 8) {
                  const lat = +event.currentTarget.cells[6].innerText;
                  const lon = +event.currentTarget.cells[7].innerText;
                  setPosition(lat, lon);
                }
              }}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button
          onClick={() => gotoPage(pageCount! - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={'' + pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
