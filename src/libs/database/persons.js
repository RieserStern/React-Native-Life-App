import AsyncStorage from "@react-native-community/async-storage";
import { KEY_APP_DATA } from "../../constants/database";

export const savePersons = async (persons) => {
  await AsyncStorage.setItem(KEY_APP_DATA.PERSON, JSON.stringify(persons));
};

export const getPerson = async (person_id) => {
  const persons = await AsyncStorage.getItem(KEY_APP_DATA.PERSON);

  const personArray = JSON.parse(persons);

  let result = null;

  personArray.forEach((person) => {
    if (person.objectId == person_id) {
      result = person;
    }
  });

  return result;
};

export const addPerson = async (person) => {
  const persons = await AsyncStorage.getItem(KEY_APP_DATA.PERSON);

  let personArray = JSON.parse(persons);
  if(!personArray) {
    personArray = [];
  }
  personArray.push(person);

  await AsyncStorage.setItem(KEY_APP_DATA.PERSON, JSON.stringify(personArray));
};

export const getPersonName = async (person_id) => {
  const persons = await AsyncStorage.getItem(KEY_APP_DATA.PERSON);

  const personArray = JSON.parse(persons);

  let result = null;

  personArray.forEach((person) => {
    if (person.objectId == person_id) {
      result =
        person.fullname ?? person.username ?? person.email ?? person.phone;
    }
  });

  return result;
};
