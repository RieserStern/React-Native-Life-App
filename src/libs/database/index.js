import { savePersons, getPerson, getPersonName, addPerson } from "./persons";
import { saveUserToDatabase, getUserFromDatabase } from "./user";
import { saveGroups, getGroup, getGroupName } from "./groups";
import { saveMembers, getMember } from "./members";
import { saveFriends, getFriend, getFriends } from "./friends";
import { saveSingles, getSingle, addSingle } from "./singles";

export const DB_INTERNAL = {
  saveUserToDatabase,
  getUserFromDatabase,

  savePersons,
  getPerson,
  getPersonName,
  addPerson,

  saveGroups,
  getGroup,
  getGroupName,

  saveMembers,
  getMember,

  saveFriends,
  getFriend,
  getFriends,

  saveSingles,
  getSingle,
  addSingle,
};
