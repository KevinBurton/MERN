import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import styled from 'styled-components';

import { Table } from '../Table/Table';

import { Theater } from '../../models/Theater';

import { MapDrawing } from '../Map/MapDrawing';

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
  const [ theaters, setTheaters] = useState<Theater[]>([]);
  const [ position, setPosition] = useState({ lng: -93.261429, lat: 45.126179 });
  useEffect(() => {
    if(theaters.length < 1) {
      axios.get('http://localhost:5000/theaters/')
      .then(res => {

        setTheaters(res.data);

        if(res.data.length > 0) {
          setPosition({
            lng: res.data[0].location.geo.coordinates[0],
            lat: res.data[0].location.geo.coordinates[1]
          });
        }

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
          <Table<Theater> columns={columns}
                          data={theaters}
                          setPosition={(lat: number, lng: number) => {
                            setPosition({ lat: lat, lng: lng});
                          }}/>
          <MapDrawing position={position}/>
        </Styles>
      ) : (
        <p>Loading . . .</p>
      ));
  }

export default TheaterList;
