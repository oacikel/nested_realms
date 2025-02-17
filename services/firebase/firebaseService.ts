import { get, update, remove, push, set } from 'firebase/database'
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
   * @param autoGenerateId - If true, a new key will be generated for the data.
   * @returns The key of the newly created data.
   */
  async setDocument(
    path: string,
    data: unknown,
    autoGenerateId: boolean = true,
  ): Promise<string | null> {
    if (autoGenerateId) {
      const docRef = ref(db, path)
      return await push(docRef, data).key
    } else {
      const docRef = ref(db, path)
      await set(docRef, data)
      return docRef.key
    }
  },

  /**
   * Updates specific fields in an existing document.
   * @param path - The database path of the document to update.
   * @param data - An object containing only the fields to update.
   */
  async updateDocument(path: string, data: object): Promise<string | null> {
    const docRef = ref(db, path)
    console.log('Updating ', path, 'with,', data)
    await update(docRef, data)
    return docRef.key
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
