import {
  collection,
  getFirestore,
  getDocs,
  updateDoc,
  orderBy,
  query,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'

export const getTodos = async () => {
  const db = getFirestore()
  const data = query(collection(db, 'todos'), orderBy('dataCreate', 'asc'))
  const dataSnapshot = await getDocs(data)
  const tasks = []
  let index = 0,
    i = 0
  dataSnapshot.forEach((data) => {
    if (tasks[index] === undefined) tasks[index] = []
    tasks[index].push(data.data())
    i++
    if (i === 5) {
      index++
      i = 0
    }
  })
  return tasks
}

export const addNewTaskToBack = async (task) => {
  const db = getFirestore()
  const taskDoc = await addDoc(collection(db, 'todos'), {
    text: task,
    crossedText: false,
    dataCreate: new Date()
  })
  await updateDoc(taskDoc, {
    id: taskDoc.id
  })
  return await getTodos()
}

export const removeTaskById = async (id) => {
  const db = getFirestore()
  await deleteDoc(doc(db, 'todos', id))
  return await getTodos()
}

export const editThisTaskById = async (task) => {
  const db = getFirestore()
  const clientsRef = doc(db, 'todos', task.id)
  await updateDoc(clientsRef, {
    text: task.text
  })
}

//here not from here
export const setTaskToTrue = async (task) => {
  const db = getFirestore()
  const clientsRef = doc(db, 'todos', task.id)
  await updateDoc(clientsRef, {
    crossedText: task.crossedText
  })
}
