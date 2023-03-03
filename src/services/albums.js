import { db } from '../firebase';
import { getDoc, getDocs, doc, collection } from 'firebase/firestore';

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

export const serviceAlbums = { getAlbum, getAlbums };