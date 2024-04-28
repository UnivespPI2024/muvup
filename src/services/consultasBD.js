import { db } from '../firebase'
import { collection, getDocs, query } from 'firebase/firestore/lite';
import { MAX_ALUNOS } from '../constantes';

export const consultaAulasDispProf = async (emailProf, dia) => {
  const q = query(collection(db, 'Professores', emailProf, dia));
  const querySnapshot = await getDocs(q).catch((error) => { console.log('erro', error); })
  // horarios disponíveis por professor => limite de alunos por aula = MAX_ALUNOS
  const horariosDisp = querySnapshot.docs.map(doc => {
    if (Object.keys(doc.data().alunos).length < MAX_ALUNOS) {
      return doc.id
    }
  }).filter(value => value !== undefined);
  return horariosDisp
}


