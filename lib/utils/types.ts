export interface Coords {
  lat: number
  lng: number
}

export interface Place {
  id: string
  location: Coords
  title?: string
}
