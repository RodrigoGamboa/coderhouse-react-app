import { db } from '../firebase';
import { getDoc, doc, collection, addDoc } from 'firebase/firestore';

const getOrder = async orderId => {
    const orderDocumentRef = doc(db, 'orders', orderId);
    const document = await getDoc(orderDocumentRef);
    if (document.exists()) {
        const {buyer, ...order} = document.data();
        return order;
    }
    return {};
};

const addOrder = async order => {
    const ordersCollectionRef = collection(db, 'orders');
    const document = await addDoc(ordersCollectionRef, order);
    if (document.id) { 
        return document.id;
    }
    return null;
}

export const serviceOrders = { getOrder, addOrder };