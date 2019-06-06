import React, { useState, useEffect } from 'react';
import Form from './Form'


const URI = `https://www.govtrack.us/api/v2/role?current=true&role_type=senator`

const filterByState = (senators, state) => senators.filter(senator => senator.state === state.toUpperCase())

const filterByParty = (senators, party) => senators.filter(senator => senator.party === party)

const getSenators = async (url) => fetch(url).then(res => res.json()).then(data => data.objects)

const searchSenators = (senators = [], filter = { party: '', state: '' }) => {
  // Make sure the filter.party and filter.state are both being used
  if (filter.party && filter.state)
    return senators.filter(senator => filter.party === senator.party && filter.state === senator.state.toUpperCase())

  // Determine which filter is being used and filter appropriately predicated upon the filter object 
  return filter.party ?
    filterByParty(senators, filter.party) :
    filterByState(senators, filter.state)
}

export default () => {
  const [senators, setSenators] = useState([])
  const [searched, setSearched] = useState([])

  useEffect(() => {
    getSenators(URI)
      .then(results => setSenators(results))
  }, [senators, searched]);


  return (
    <div>
      <Form onSearched={filter => {
        const filtered = searchSenators(senators, filter)
        setSearched(filtered)
      }} />
      <ul>
        {searched.map((senator, index) => (
          <li key={index}>{senator.person.lastname} | {senator.party}</li>
        ))}
      </ul>
    </div>
  )
};