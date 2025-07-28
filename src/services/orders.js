import { getDatabase, ref, get, child } from 'firebase/database';

export async function fetchOrders() {
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, 'orders'));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([id, value]) => ({ id, ...value }));
  } else {
    return [];
  }
}