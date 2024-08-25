import EncryptedStorage from 'react-native-encrypted-storage';

const setEncrytedStorage = async<T> (key: string, value: T) => {
  await EncryptedStorage.setItem(key, JSON.stringify(value));
};

const getEncrytedStorage = async (key: string) => {
  const storedValue = await EncryptedStorage.getItem(key);

  return storedValue ? JSON.parse(storedValue) : null;
};

const removeEncryptedStorage = async (key: string) => {
  const storedValue = await getEncrytedStorage(key);

  if (storedValue) {
    await EncryptedStorage.removeItem(key);
  }
};

export {
  setEncrytedStorage,
  getEncrytedStorage,
  removeEncryptedStorage
};