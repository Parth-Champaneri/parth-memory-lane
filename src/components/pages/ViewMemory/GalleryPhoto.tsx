import React from 'react'
import { Photo } from '../../../models'
import { TrashIcon } from '@heroicons/react/24/outline'
import './GalleryPhoto.css'
import { deleteObject, ref } from 'firebase/storage'
import apiService from '../../../apiService'
import storage from '../../../firebase-config'

type GalleryPhotoProps = {
  photo: Photo
  onDelete: () => void
}

const GalleryPhoto: React.FC<GalleryPhotoProps> = ({ photo, onDelete }) => {
  const handleDeletePhoto = async () => {
    const photoRef = ref(storage, photo.url)

    try {
      await deleteObject(photoRef)
      await apiService.deletePhoto(photo.id)
      onDelete()
    } catch (error) {
      console.error('Error occurred while deleting the photo:', error)
    }
  }

  return (
    <div className='photo-container'>
      <img
        src={photo.url}
        alt={photo.name}
        className='gallery-image shadow-lg rounded'
        loading='lazy'
      />
      <button className='delete-button' onClick={handleDeletePhoto}>
        <TrashIcon className='h-4 w-4 inline-flex items-center' />
      </button>
    </div>
  )
}

export default GalleryPhoto
