// PhotoUploader.tsx
import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import storage from '../../../firebase-config'
import apiService from '../../../apiService'
import { Photo } from '../../../models'

type PhotoUploaderProps = {
  memoryId: string
  onPhotoAdded: (photo: Photo) => void
}

const AddPhotoButton: React.FC<PhotoUploaderProps> = ({
  memoryId,
  onPhotoAdded,
}) => {
  const triggerFileInput = () => {
    const fileInput = document.getElementById(
      'photo-upload'
    ) as HTMLInputElement
    fileInput.click()
  }
  const handleAddPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target
    const file = event.target.files?.[0]
    if (!file) return

    const uniqueFilename = `${file.name}_${Date.now()}`
    const storageRef = ref(storage, `memories/${memoryId}/${uniqueFilename}`)

    try {
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)

      const response = await apiService.addPhotoToMemory(
        parseInt(memoryId, 10),
        downloadURL,
        uniqueFilename
      )
      onPhotoAdded({
        id: Number(response.id),
        url: downloadURL,
        name: uniqueFilename,
        memoryId: parseInt(memoryId, 10),
      })
      fileInput.value = ''
    } catch (error) {
      console.error('Error occurred', error)
    }
  }

  return (
    <>
      <input
        type='file'
        id='photo-upload'
        style={{ display: 'none' }}
        onChange={handleAddPhoto}
      />
      <button onClick={triggerFileInput} className='action-button'>
        <PlusIcon className='h-5 w-5' />
        Add Photo
      </button>
    </>
  )
}

export default AddPhotoButton
