import { useEffect, useState } from 'react'

import { useParams, useNavigate, Link } from 'react-router-dom'
import apiService from '../../../apiService'
import { Memory, Photo } from '../../../models'
import './MemoryDetails.css'
import { ChevronLeftIcon, PencilIcon } from '@heroicons/react/24/outline'
import MemoryModal from '../../shared/MemoryModal'
import AddPhotoButton from './AddPhotoButton'
import GalleryPhoto from './GalleryPhoto'
import DeleteMemoryButton from './DeleteMemoryButton'

const MemoryDetails = () => {
  const { memoryId } = useParams()
  const [memory, setMemory] = useState<Memory | null>(null)
  const navigate = useNavigate()

  const [showEditModal, setShowEditModal] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedDescription, setEditedDescription] = useState('')
  const [editedTimestamp, setEditedTimestamp] = useState('')

  const [photos, setPhotos] = useState<Photo[]>([])

  const onPhotoAdded = (photo: Photo) => {
    setPhotos((currentPhotos) => [...currentPhotos, photo])
  }

  const onPhotoDeleted = (photoId: number) => {
    setPhotos((currentPhotos) =>
      currentPhotos.filter((photo) => photo.id !== photoId)
    )
  }

  const handleDeleteMemory = () => {
    apiService.deleteMemory(memory?.id).then(() => {
      navigate('/')
    })
  }

  const handleEditSettings = () => {
    setEditedName(memory!.name)
    setEditedDescription(memory!.description)
    setEditedTimestamp(memory!.timestamp)
    setShowEditModal(true)
  }

  const updateMemoryDetails = () => {
    if (memory) {
      const updatedMemory = {
        ...memory,
        name: editedName,
        description: editedDescription,
        timestamp: editedTimestamp,
      }
      apiService
        .updateMemory(memory.id!, updatedMemory)
        .then(() => {
          setMemory(updatedMemory)
          setShowEditModal(false)
        })
        .catch((error) => {
          console.error(`Error updating memory:`, error)
        })
    }
  }

  const fetchMemoryDetailsAndPhotos = async () => {
    if (!memoryId) return

    try {
      const memoryData = await apiService.fetchMemoryById(
        parseInt(memoryId, 10)
      )
      if (memoryData.memory) {
        setMemory(memoryData.memory)

        const photosResponse = await apiService.fetchPhotosForMemory(
          parseInt(memoryId, 10)
        )
        if (photosResponse && photosResponse.photos) {
          setPhotos(photosResponse.photos)
        }
      }
    } catch (error) {
      console.error(`Error fetching details for memory ID ${memoryId}:`, error)
    }
  }

  useEffect(() => {
    fetchMemoryDetailsAndPhotos()
  }, [memoryId])

  return (
    <>
      <div className='flex justify-between bg-gray-100 items-center rounded mt-4 px-2 py-2'>
        <Link to={'/'}>
          <button className='action-button'>
            <ChevronLeftIcon className='h-5 w-5' />
            All Memories
          </button>
        </Link>
        <div className='flex row gap-6'>
          <button onClick={handleEditSettings} className='action-button'>
            <PencilIcon className='h-5 w-5 mr-1' />
            Edit Settings
          </button>
          <AddPhotoButton memoryId={memoryId!} onPhotoAdded={onPhotoAdded} />
          <DeleteMemoryButton onDeleteConfirm={handleDeleteMemory} />
        </div>
      </div>
      <div className='flex items-start bg-gray-100 p-4 rounded mt-4 space-x-4 mb-4'>
        {memory ? (
          <>
            <img
              src={`https://picsum.photos/100?random=${memoryId}`}
              alt='Memory'
              className='w-20 h-20 rounded-full'
            />{' '}
            <div className='flex-grow'>
              <h3 className='text-lg font-semibold'>{memory.name}</h3>
              <p className='text-gray-600'>{memory.description}</p>
              <p className='text-sm text-gray-500'>{memory.timestamp}</p>
            </div>
          </>
        ) : (
          <p>Loading memory details...</p>
        )}
      </div>
      <div className='gallery-container p-4'>
        {photos.map((photo, index) => (
          <GalleryPhoto
            key={index}
            photo={photo}
            onDelete={() => onPhotoDeleted(photo.id!)}
          />
        ))}
      </div>
      {photos.length == 0 && (
        <p className='flex w-full justify-center items-center text-gray-500'>
          No photos
        </p>
      )}
      {showEditModal && (
        <MemoryModal
          title='Edit Memory'
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          name={editedName}
          setName={setEditedName}
          description={editedDescription}
          setDescription={setEditedDescription}
          timestamp={editedTimestamp}
          setTimestamp={setEditedTimestamp}
          handleSubmit={updateMemoryDetails}
        />
      )}
    </>
  )
}

export default MemoryDetails
