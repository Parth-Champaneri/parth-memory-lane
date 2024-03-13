const API_BASE_URL = 'http://localhost:4001'

import { Memory } from './models'

const fetchMemories = (sortOrder: string) => {
  return fetch(`${API_BASE_URL}/memories?sortOrder=${sortOrder}`)
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching memories:', error))
}

const fetchMemoryById = (id: number) => {
  return fetch(`${API_BASE_URL}/memories/${id}`)
    .then((response) => response.json())
    .catch((error) =>
      console.error(`Error fetching memory with ID ${id}:`, error)
    )
}

const createMemory = (memory: Memory) => {
  return fetch(`${API_BASE_URL}/memories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memory),
  })
    .then((response) => response.json())
    .catch((error) => console.error('Error adding memory:', error))
}

const updateMemory = (id: number, memory: Memory) => {
  return fetch(`${API_BASE_URL}/memories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memory),
  })
    .then((response) => response.json())
    .catch((error) => console.error('Error updating memory:', error))
}

const deleteMemory = (memoryId: number | undefined) => {
  return fetch(`${API_BASE_URL}/memories/${memoryId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .catch((error) => console.error('Error deleting memory:', error))
}

const fetchPhotosForMemory = (memoryId: number) => {
  return fetch(`${API_BASE_URL}/memories/${memoryId}/photos`)
    .then((response) => response.json())
    .catch((error) =>
      console.error(`Error fetching photos for memory ID ${memoryId}:`, error)
    )
}

const addPhotoToMemory = (memoryId: number, url: string, name: string) => {
  return fetch(`${API_BASE_URL}/photos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ memory_id: memoryId, url, name }),
  })
    .then((response) => response.json())
    .catch((error) =>
      console.error(`Error adding photo to memory ID ${memoryId}:`, error)
    )
}

const deletePhoto = (photoId: number) => {
  return fetch(`${API_BASE_URL}/photos/${photoId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .catch((error) =>
      console.error(`Error deleting photo ID ${photoId}:`, error)
    )
}

const apiService = {
  fetchMemories,
  createMemory,
  deleteMemory,
  updateMemory,
  fetchMemoryById,
  fetchPhotosForMemory,
  addPhotoToMemory,
  deletePhoto,
}

export default apiService
