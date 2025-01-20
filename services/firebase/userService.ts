import { FirebaseService } from "./firebaseService";

const USERS_PATH = "users";

export const UserService = {
  async getUser(userId: string) {
    return FirebaseService.getDocument(`${USERS_PATH}/${userId}`);
  },

  async updateUser(userId: string, data: any) {
    return FirebaseService.updateDocument(`${USERS_PATH}/${userId}`, data);
  },

  async createUser(userId: string, userData: any) {
    return FirebaseService.setDocument(`${USERS_PATH}/${userId}`, userData);
  },
};
