import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

const getOrder = async orderId => {
    const orderDocumentRef = doc(db, 'orders', orderId);
    const document = await getDoc(orderDocumentRef);
    if (document.exists()) {
        const {buyer, ...order} = document.data();
        return order;
    }
    return {};
};

export const serviceOrders = { getOrder };