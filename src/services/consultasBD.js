import { db } from '../firebase'
import { collection, getDocs, query } from 'firebase/firestore/lite';
import { MAX_ALUNOS } from '../constantes';

export const consultaAulasDispProf = async (emailProf, dia) => {
  const q = query(collection(db, 'Professores', emailProf, dia));
  const querySnapshot = await getDocs(q).catch((error) => { console.log('erro', error); })
  // horarios disponíveis por professor => limite de alunos por aula = MAX_ALUNOS
  const horariosDisp = querySnapshot.docs
    .filter(doc => Object.keys(doc.data().alunos).length < MAX_ALUNOS)
    .map(doc => doc.id);

  return horariosDisp;
}

export const consultaAulaEditProf = async (emailProf, diaSemana) => {
  const qSeg = query(collection(db, 'Professores', emailProf, diaSemana));
  const querySnapshotSeg = await getDocs(qSeg)
  return querySnapshotSeg.docs.map((doc) => { return doc.id })
}

