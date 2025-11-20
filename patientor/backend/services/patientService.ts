import data from "../data/patients"
import { NoSsnPatient } from "../types"

const getNonSsnData = (): NoSsnPatient[] => {
  const patientData = data.map(({ id, name, occupation, gender, dateOfBirth }) =>
    ({
      id, name, occupation, gender, dateOfBirth
    }))
  return patientData
}

export default { getNonSsnData }