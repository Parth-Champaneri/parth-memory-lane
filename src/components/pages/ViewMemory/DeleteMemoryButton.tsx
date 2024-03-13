import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

type DeleteMemoryButtonProps = {
  onDeleteConfirm: () => void
}

const DeleteMemoryButton: React.FC<DeleteMemoryButtonProps> = ({
  onDeleteConfirm,
}) => {
  const [isDialogVisible, setDialogVisible] = useState(false)

  const handleDeleteClick = () => {
    setDialogVisible(true)
  }

  const handleConfirm = () => {
    onDeleteConfirm()
    setDialogVisible(false)
  }

  const handleCancel = () => {
    setDialogVisible(false)
  }

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className='inline-flex items-center action-button hover:bg-red-100 hover:text-red-800'
      >
        <TrashIcon className='h-5 w-5 mr-1' />
        Delete Memory
      </button>

      {isDialogVisible && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-4 rounded-lg shadow-lg max-w-sm w-full'>
            <p className='text-lg mb-4'>
              Are you sure you want to delete this memory?
            </p>
            <div className='flex justify-end gap-4'>
              <button
                className='bg-gray-300 hover:bg-gray-400 text-gray-800  py-1 px-2 rounded'
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className='bg-red-500 hover:bg-red-700 text-white  py-1 px-3 rounded'
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteMemoryButton
