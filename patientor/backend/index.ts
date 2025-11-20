import express, { Response } from 'express';
import diagnoseService from './services/diagnoseService'
import { Diagnosis, NoSsnPatient } from './types';
import patientService from './services/patientService';

const app = express();

app.use(express.json());

const PORT = 3001;

app.get('/api/diagnoses', (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnoseService.getEntries()).end()
})

app.get('/api/patients', (_req, res: Response<NoSsnPatient[]>) => {
  const patientData = patientService.getNonSsnData()
  res.json(patientData).end()
})

app.get('/api/ping', (_req, res) => {
  console.log(`${new Date().toLocaleTimeString()} - someone pinged here`);
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});