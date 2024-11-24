import React from 'react'

export default function ClickableTaskInput({value}) {
  return (
    <>
      {value ? <div>✔</div> : <div>✖</div>}
    </>
  )
}
