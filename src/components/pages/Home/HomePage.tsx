import { useEffect, useState } from 'react'
import { Memory } from '../../../models'
import MemoryListItem from './MemoryListItem'
import apiService from '../../../apiService'
import { PlusIcon } from '@heroicons/react/24/outline'
import MemoryModal from '../../shared/MemoryModal'

function HomePage() {
  const [showModal, setShowModal] = useState(false)
  const [memories, setMemories] = useState<Memory[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [timestamp, setTimestamp] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')

  const fetchMemoriesData = () => {
    apiService
      .fetchMemories(sortOrder)
      .then((data) => setMemories(data.memories))
  }

  const createNewMemory = () => {
    const newMemory: Memory = { name, description, timestamp }

    apiService.createMemory(newMemory).then(() => {
      fetchMemoriesData()
      setShowModal(false)
      setName('')
      setDescription('')
      setTimestamp('')
    })
  }

  const onModalClose = () => {
    setShowModal(false)
    setDescription('')
    setTimestamp('')
    setName('')
  }

  useEffect(() => {
    fetchMemoriesData()
  }, [sortOrder])

  return (
    <>
      <div className='flex row px-2 py-2 bg-gray-100 items-center rounded mt-4'>
        <div className='flex row items-center'>
          <select
            value={sortOrder}
            className='bg-gray-100 hover:bg-gray-200 rounded px-2 py-1 cursor-pointer'
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value='newest'>Sort Newest First</option>
            <option value='oldest'>Sort Oldest First</option>
          </select>
        </div>
      </div>
      {memories.map((memory) => (
        <MemoryListItem key={memory.id} memory={memory} />
      ))}
      <button
        className='bg-gray-100 memory-item text-gray-600 py-6 px-4 w-full rounded inline-flex items-center justify-center'
        onClick={() => setShowModal(true)}
      >
        <PlusIcon className='h-5 w-5 mr-2 ' />
        New Memory
      </button>
      <MemoryModal
        title='Add New Memory'
        isOpen={showModal}
        onClose={onModalClose}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        timestamp={timestamp}
        setTimestamp={setTimestamp}
        handleSubmit={createNewMemory}
      />
    </>
  )
}

export default HomePage
