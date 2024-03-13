export interface Memory {
  id?: number
  name: string
  description: string
  timestamp: string
}

export interface Photo {
  id: number
  url: string
  name: string
  memoryId: number
}
