import React, { useState, useEffect } from 'react';
const URI = `https://www.govtrack.us/api/v2/role?current=true&role_type=senator`

const getSenators = async (url) => fetch(url).then(res => res.json()).then(data => data.objects)

export default () => {
    const [senators, setSenators] = useState([])
  
    useEffect(() => {
      getSenators(URI)
        .then(results => setSenators(results))
    }, [senators]);


    
    return (
    <div>
        <h1>Home</h1>
            <ul>
                {senators.map((senator, index) => (
                <li key={index}>{senator.person.lastname} | {senator.party}</li>
            ))}
        </ul>
    </div>
    )
}