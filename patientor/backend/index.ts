import express, { Response } from 'express';
import diagnoseService from './services/diagnoseService'
import { Diagnosis, NoSsnPatient, Patient } from './types';
import patientService from './services/patientService';

const app = express();

app.use(express.json());

const PORT = 3001;
const patients = patientService.getEntries()
const diagnoses = diagnoseService.getEntries()

app.get('/api/diagnoses', (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnoses).end()
})

app.get('/api/patients', (_req, res: Response<NoSsnPatient[]>) => {
  const patientData = patientService.getNonSsnData(patients)
  res.json(patientData).end()
})

app.post('/api/patients', (req, res: Response<Patient | string>) => {
  try {
    const patient = patientService.createEntry(req.body)
    patients.push(patient)
    res.json(patient).end()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message).end()
      return
    } else {
      res.status(400).send("Something went wrong").end()
      return
    }
  }
})

app.get('/api/ping', (_req, res) => {
  console.log(`${new Date().toLocaleTimeString()} - someone pinged here`);
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});