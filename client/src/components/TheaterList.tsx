import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import styled from 'styled-components';

import { Table } from './Table';

import { Theater } from '../models/Theater';

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
`

export function TheaterList() {
  const [ theaters, setTheaters] = useState([]);
  useEffect(() => {
    if(theaters.length < 1) {
      axios.get('http://localhost:5000/theaters/')
      .then(res => {
        setTheaters(res.data);
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      });
    }
  });
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'theaterId',
        minWidth: 20,
        className: 'frozen'
      },
      {
        Header: 'Street1',
        accessor: 'location.address.street1',
      },
      {
        Header: 'Street2',
        accessor: 'location.address.street2',
      },
      {
        Header: 'City',
        accessor: 'location.address.city',
      },
      {
        Header: 'State',
        accessor: 'location.address.state',
        minWidth: 25
      },
      {
        Header: 'Zip',
        accessor: 'location.address.zipcode',
        minWidth: 30
      },
      {
        Header: 'Latitude',
        accessor: 'location.geo.coordinates[1]',
        minWidth: 40
      },
      {
        Header: 'Longitude',
        accessor: 'location.geo.coordinates[0]',
        minWidth: 40
      }
    ],[]);

    return ( theaters.length > 0 ?
      (
        <Styles>
          <Table<Theater> columns={columns} data={theaters}/>
        </Styles>
      ) : (
        <p>Loading . . .</p>
      ));
  }

export default TheaterList;
