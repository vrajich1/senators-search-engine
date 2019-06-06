import React, { useState, useEffect } from 'react';
import Form from './Form'


const URI = `https://www.govtrack.us/api/v2/role?current=true&role_type=senator`

const filterByState = (senators, state) => senators.filter(senator => senator.state === state.toUpperCase())

const filterByParty = (senators, party) => senators.filter(senator => senator.party === party)

const getSenators = async (url) => fetch(url).then(res => res.json()).then(data => data.objects)

const searchSenators = (senators = [], filter = {}) => senators.filter(({party, state}) => (filter.party && filter.party.length > 0 && party === filter.party) || (filter.state.length > 0 && state === state.toUpperCase()))

export default () => {
  const [senators, setSenators] = useState([])
  const [searched, setSearched] = useState(senators)
  // console.log(senators);
  // console.log(searched)

  useEffect(() => {
    getSenators(URI).then(results => setSenators(results))
    }, [senators, searched]);


  return (
    <div>
      <Form onSearched={filter => {
        let filtered = searchSenators(senators, filter)
        // console.log(filtered)
        // filtered = filter.party && filterByParty(filtered, filter.party) || []
        setSearched(filtered)
        // console.log(filtered)
      }} />
      <ul>
        {searched.map(senator => (
          <li>{senator.person.lastname}</li>
        ))}
      </ul>
    </div>
  )
};