import { Gender } from "../types"

export const parseName = (name: unknown): string => {
    if (!name || typeof name !== 'string') {
        throw new Error('Invalid or missing name')
    }
    return name
}

export const parseOccupation = (occupation: unknown): string => {
    if (!occupation || typeof occupation !== 'string') {
        throw new Error('Invalid or missing occupation')
    }
    return occupation
}

export const parseGender = (gender: unknown): Gender => {
    if (typeof gender === "string" && (Object.values(Gender).map(v => v.toString()).includes(gender)) ) {
        return gender as Gender
    }
    throw new Error('Invalid or missing gender')
}

export const parseSsn = (ssn: unknown): string | undefined => {
    if (!ssn) {
        return undefined
    }
    if (typeof ssn === "string") {
        return ssn
    }
    throw new Error('Invalid or missing social security number')
}

export const parseDoB = (dob: unknown): string | undefined => {
    if (!dob) {
        return undefined
    }
    if (typeof dob === "string") {
        return dob
    }
    throw new Error('Invalid or missing date of birth')
}


export default { parseName, parseOccupation, parseGender, parseSsn }