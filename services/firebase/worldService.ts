import { FirebaseService } from "./firebaseService";

const WORLDS_PATH = "worlds";

export const WorldService = {
  async getWorld(worldId: string) {
    return FirebaseService.getDocument(`${WORLDS_PATH}/${worldId}`);
  },

  async getAllWorlds() {
    return FirebaseService.getCollection(WORLDS_PATH);
  },

  async updateWorld(worldId: string, data: any) {
    return FirebaseService.updateDocument(`${WORLDS_PATH}/${worldId}`, data);
  },
};
