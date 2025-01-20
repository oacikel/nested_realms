import { get, set, update, remove } from 'firebase/database'
import { db, ref } from 'services/firebase/firebaseConfig'

export const FirebaseService = {
  /**
   * Retrieves a single document from Realtime Database.
   */
  async getDocument(path: string) {
    const docRef = ref(db, path)
    const snapshot = await get(docRef)
    return snapshot.exists() ? snapshot.val() : null
  },

  /**
   * Writes or updates a document in Realtime Database.
   * @param path - The database path where the data should be stored.
   * @param data - The data to store.
   */
  async setDocument(path: string, data: any) {
    const docRef = ref(db, path)
    await set(docRef, data)
  },

  /**
   * Updates specific fields in an existing document.
   * @param path - The database path of the document to update.
   * @param data - An object containing only the fields to update.
   */
  async updateDocument(path: string, data: any) {
    const docRef = ref(db, path)
    await update(docRef, data)
  },

  /**
   * Deletes a document from Realtime Database.
   * @param path - The database path of the document to delete.
   */
  async deleteDocument(path: string) {
    const docRef = ref(db, path)
    await remove(docRef)
  },

  /**
   * Retrieves all children of a given path.
   * @param path - The parent path to retrieve children from.
   */
  async getCollection(path: string) {
    const collectionRef = ref(db, path)
    const snapshot = await get(collectionRef)
    if (!snapshot.exists()) return []

    const data = snapshot.val()
    return Object.keys(data).map((key) => ({ id: key, ...data[key] }))
  },
}
