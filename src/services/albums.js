import { db } from '../firebase';
import { getDoc, getDocs, doc, collection, setDoc } from 'firebase/firestore';

const getAlbums = async categoryId => {
    const albumsCollectionRef = collection(db, 'albums');
    const documents = await getDocs(albumsCollectionRef);
    let albums = documents.docs.map(document => ({
        ...document.data(), 
        id: document.id
    }));
    if (categoryId) {
        const albumsByCategory = albums.filter(album => album.genre.toLowerCase() === categoryId.toLowerCase());
        return albumsByCategory;
    } else {
        return albums;
    }
};

const getAlbum = async itemId => {
    let album = {};
    const albumDocumentRef = doc(db, 'albums', itemId);
    const document = await getDoc(albumDocumentRef);
    if (document.exists()) {
        album = {
            ...document.data(), 
            id: document.id
        };
    }
    return album;
};

async function checkInventory (itemId, itemQuantity) {
    console.log(itemId, itemQuantity)
    const album = await getAlbum(itemId);
    if (album.stock >= itemQuantity) {
        modifyInventory(itemId, album.stock - itemQuantity);
        return true;
    } else {
        return false;
    }
}
/*
const checkInventory = async cart => {
    const result = {
        availability: [],
        itemsNotAvailable: 0
    }
    cart.forEach(itemCart => {
        getAlbum(itemCart.id).then(album => {
            if (album.stock >= itemCart.quantity) {
                result.availability.push({id: itemCart.id, available: true});
                modifyInventory(itemCart.id, album.stock - itemCart.quantity);
            }
            else {
                result.itemsNotAvailable = 10
                result.availability.push({id: itemCart.id, available: false});
            }
        })
    });
    return result;
}
*/
const modifyInventory = async (albumId, newStock) => {
   const albumDocumentRef = doc(db, 'albums', albumId);
   setDoc(albumDocumentRef, { stock: newStock }, { merge: true });
}

export const serviceAlbums = { getAlbum, getAlbums, checkInventory };