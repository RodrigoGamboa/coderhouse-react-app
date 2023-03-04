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
        const albumsByCategory = albums.filter(album => album.album_data.genre.toLowerCase() === categoryId.toLowerCase());
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

const checkInventory = async items => {
   let inventoryResult = {
    available: {},
    notAvailable: {}
   };
   const albums = await getAlbums();
   albums.forEach(album => {
    items.forEach(itemFromCart => {
        if (album.id === itemFromCart.id) {
            if (album.stock >= itemFromCart.quantity) {
                inventoryResult.available[album.id] = {...album}
            } else {
                inventoryResult.notAvailable[album.id] = {...album}
            }
        }
    })
   })
   return inventoryResult;
}

const updateInventory = async (albumId, quantityToReduce) => {
   const album = await getAlbum(albumId);
   const albumDocumentRef = doc(db, 'albums', albumId);
   setDoc(albumDocumentRef, { stock: album.stock - quantityToReduce }, { merge: true });
}

export const serviceAlbums = { getAlbum, getAlbums, checkInventory, updateInventory };