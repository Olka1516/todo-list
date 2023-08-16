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
  const data = query(collection(db, 'todos'), orderBy('dataCreate', 'desc'))
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

export const generateNewTask = async (task) => {
  const db = getFirestore()
  const taskDoc = await addDoc(collection(db, 'todos'), {
    text: task,
    isTextDone: false,
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

export const setTaskIsDoneById = async (task) => {
  const db = getFirestore()
  const clientsRef = doc(db, 'todos', task.id)
  await updateDoc(clientsRef, {
    isTextDone: !task.isTextDone
  })
}
