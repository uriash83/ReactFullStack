import React from 'react'

export default ({input,label,meta: {error,touched }}) => {
    //console.log(props)
    //console.log(meta)
    // {...input} == onChange={input.onChange} onBlur={input.onBlur}
    return(
        <div>
            <label>{label}</label>
            <input {...input}   style={{marginBottom: "5px"}}/> 
            <div className="red-text" style={{marginBottom: "20px"}}>
            {touched && error }
            </div>
            
        </div> // jeśli touched && error =1 zwraca error , a jeśli touched ==0 nic nie zwraca
    )
}