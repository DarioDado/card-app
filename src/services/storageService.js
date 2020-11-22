class StorageService {

    saveData = (key, value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    getData = key => {
        return JSON.parse(window.localStorage.getItem(key));
    }

    deleteData = key => {
        window.localStorage.removeItem(key);
    }
    
}

export const storageService = new StorageService();
 