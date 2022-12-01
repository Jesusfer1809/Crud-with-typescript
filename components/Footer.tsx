import React from 'react'

function Footer(): JSX.Element {
  return (
    <div className='flex flex-col space-y-2 items-center py-2 text-xs border-t border-white bg-gray-900 justify-self-end text-gray-400 md:text-sm'>
      <p>Task Manager &copy;. All rights reserved.</p>
      <p>Made with 🤍 in Lima, Peru</p>
    </div>
  )
}

export default Footer
