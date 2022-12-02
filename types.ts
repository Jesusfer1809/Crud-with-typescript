import { ParsedUrlQuery } from 'querystring'

export interface RickMortyResults {
  info: Info
  results: Character[]
}

export interface Info {
  count: number
  pages: number
  next: string
  prev: null
}

export interface QueryId extends ParsedUrlQuery {
  id: string
}

export interface TaskStructure {
  title: string
  description: string
  creator?: string
  id?: number | string
}

export type ID = string | number

export interface TasksContextInterface {
  tasks: TaskStructure[]
  createTask: (task: TaskStructure) => void
  getTask: (id: ID) => TaskStructure | undefined
  updateTask: (newTask: TaskStructure) => void
  deleteTask: (id: ID) => void
}

export interface TasksState {
  tasks: TaskStructure[]
}

export interface BasicTaskStructure {
  title: string
  description: string
}

export interface ModalState {
  id: number | string | undefined
  isOpened: boolean
}

export interface Character {
  id: number
  name: string
  status: Status
  species: Species
  type: string
  gender: Gender
  origin: Location
  location: Location
  image: string
  episode: string[]
  url: string
  created: Date
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'unknown'
}

export interface Location {
  name: string
  url: string
}

export enum Species {
  Alien = 'Alien',
  Human = 'Human'
}

export enum Status {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown'
}