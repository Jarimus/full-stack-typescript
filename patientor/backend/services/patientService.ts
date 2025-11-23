import data from "../data/patients"
import { NoSsnPatient, Patient } from "../types"
import { v1 as uuid } from 'uuid'
import { parseDoB, parseGender, parseName, parseOccupation, parseSsn } from '../utils/typeValidating'

const getEntries = (): Patient[] => {
  return data
}

const getNonSsnData = (data: Patient[]): NoSsnPatient[] => {
  const patientData = data.map(({ id, name, occupation, gender, dateOfBirth }) =>
    ({
      id, name, occupation, gender, dateOfBirth
    }))
  return patientData
}

const createEntry = (data: any): Patient => {
  if ( !data || typeof data !== 'object' ) {
    throw new Error('Invalid or missing data');
  }
  if ('name' in data && 'occupation' in data && 'gender' in data) {
    const name = parseName(data.name)
    const occupation = parseOccupation(data.occupation)
    const gender = parseGender(data.gender)
    const ssn = parseSsn(data.ssn)
    const dateOfBirth = parseDoB(data.dateOfBirth)
    const id = uuid()
    const newEntry = {
      id,
      name,
      occupation,
      gender,
      ssn,
      dateOfBirth
    }
    return newEntry
  }
  throw new Error('Required fields missing');
}

export default { getNonSsnData, getEntries, createEntry }