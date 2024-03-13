import { useState } from 'react'
import { CheckBadgeIcon, ShareIcon } from '@heroicons/react/24/outline'

const ShareButton = () => {
  const [isCopied, setCopied] = useState(false)

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1200)
  }

  return (
    <>
      {isCopied ? (
        <div>
          <p className='inline-flex text-white items-center justify-center w-full text-black'>
            <CheckBadgeIcon className='h-5 w-5 mr-1' />
            Link copied!
          </p>
        </div>
      ) : (
        <button
          className='inline-flex items-center bg-gray-700 rounded px-3 py-1 text-sm text-white'
          onClick={handleShareClick}
        >
          <ShareIcon className='h-4 w-4 mr-2' />
          Share{' '}
        </button>
      )}
    </>
  )
}

export default ShareButton
