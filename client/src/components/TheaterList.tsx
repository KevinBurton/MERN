import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const TheaterList: React.FC = () => {
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
  return (
    <div>
      {theaters.length > 0 ? (<ReactTable
          data={theaters}
          pageSizeOptions={[10, 20, 30, 50, 100, 200, 500]}
          columns={[
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
          ]}
          defaultPageSize={10}
          className='-striped -highlight'
      />) : (<p>Loading . . .</p>)}
    </div>
  );
}

export default TheaterList;
