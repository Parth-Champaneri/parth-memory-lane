import { Link } from 'react-router-dom'
import { Memory } from '../../../models'
import './MemoryListItem.css'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

interface MemorySummaryProps {
  memory: Memory
}

const MemoryListItem = ({ memory }: MemorySummaryProps) => {
  return (
    <Link to={`/memory/${memory.id}`}>
      <div className='flex items-start p-4 bg-gray-100 rounded space-x-4 my-4 memory-item '>
        <img
          src={`https://picsum.photos/100?random=${memory.id}`}
          alt='Memory'
          className='w-20 h-20 rounded-full border border-white'
        />{' '}
        <div className='flex-grow'>
          <h3 className='text-lg font-semibold'>{memory.name}</h3>
          <p className='text-gray-600'>{memory.description}</p>
          <p className='text-sm  text-gray-400'>
            {memory.timestamp} | {memory.id}
          </p>
        </div>
        <div className='inline-flex '>
          <button className='text-gray-500 py-1 inline-flex items-center '>
            <span>View Photos</span>
            <ChevronRightIcon className='h-5 w-5' />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default MemoryListItem
