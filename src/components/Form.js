import React, { useState } from 'react';

export default props => {
  const [filterState, setFilterState] = useState('')
  // const [filterName, setName] = useState('')
  const [filterParty, setParty] = useState('')

  return (
    <div>
      <h1>Search</h1>
    <form
      onSubmit={e => {
        e.preventDefault()
        const filter = { state: filterState, party: filterParty }

        if (props.onSearched) {
          props.onSearched(filter)
        }
      }}
    >
      <label htmlFor="state">State</label>
      <input type="search" className="inPut" name="state" minLength="2" maxLength="2" value={filterState} onChange={e => setFilterState(e.target.value)} />
      {/* <label htmlFor="name">Last Name</label>
      <input type="text" className="inPut" name="lastname" value={filterName} onChange={e => setName(e.target.value)} /> */}
      <select value={filterParty} onChange={e => setParty(e.target.value)}>
        <option value="">All</option>
        <option value="Democrat">Democrat</option>
        <option value="Republican">Republican</option>
        <option value="Independent">Independent</option>
      </select>
      <input type="submit" value="Submit" />
      {/* <input type="reset" value="Reset" /> */}
    </form>
    </div>
  )
};

