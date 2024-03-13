interface MemoryModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  name: string
  setName: (name: string) => void
  description: string
  setDescription: (description: string) => void
  timestamp: string
  setTimestamp: (timestamp: string) => void
  handleSubmit: () => void
}

const MemoryModal = ({
  title,
  isOpen,
  onClose,
  name,
  setName,
  description,
  setDescription,
  timestamp,
  setTimestamp,
  handleSubmit,
}: MemoryModalProps) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <div className='mt-3 text-center'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            {title}
          </h3>
          <form className='mt-2'>
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='my-2 w-full p-2 border rounded'
            />
            <textarea
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='my-2 w-full p-2 border rounded'
            />
            <input
              type='date'
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className='my-2 w-full p-2 border rounded'
            />
            <button
              type='button'
              onClick={onClose}
              className='mt-2 px-4 py-2 bg-black-500 text-black rounded '
            >
              Close
            </button>
            <button
              type='button'
              disabled={!name || !description || !timestamp}
              onClick={handleSubmit}
              className='mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300'
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MemoryModal
