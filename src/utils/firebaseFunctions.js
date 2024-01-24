import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// get all food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

// delete food item

export const deleteItem = async (id) => {
  await deleteDoc(doc(firestore, "foodItems", id));
  console.log("hamza");
};

// update food item
export const updateItem = async (id, data) => {
  await updateDoc(doc(firestore, "foodItems", id), data);
  console.log("ali4");
};

// Saving new order
export const saveOrder = async (data) => {
  await setDoc(doc(firestore, "orders", `${Date.now()}`), data, {
    merge: true,
  });
};

// delete order

export const deleteOrder = async (id) => {
  await deleteDoc(doc(firestore, "orders", id));
};

// get all orders
export const getAllOrders = async () => {
  const items = await getDocs(
    query(collection(firestore, "orders"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

// update order status
export const updateOrderStatus = async (id, data) => {
  console.log("1");
  await updateDoc(doc(firestore, "orders", id), data, { merge: true });
  console.log("2");
};

// update footer
export const updateFooter = async (id, data) => {
  await updateDoc(doc(firestore, "footer", id), data);
  console.log("ali4");
};

// update chef
export const updateChef = async (id, data) => {
  await updateDoc(doc(firestore, "chef", id), data);
  console.log("ali4");
};

// get all footer information
export const getAllfooterInfo = async () => {
  const items = await getDocs(
    query(collection(firestore, "footer"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

// get all Chef information
export const getAllChefInfo = async () => {
  const items = await getDocs(
    query(collection(firestore, "chef"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

// get all aboutUsPage items
export const getAllAboutUsPageItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "aboutUsPage"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

// Saving new AboutUsPageItem
export const saveAboutUsPageItem = async (data) => {
  await setDoc(doc(firestore, "aboutUsPage", `${Date.now()}`), data, {
    merge: true,
  });
};

// get all food items
export const getCategories = async () => {
  const items = await getDocs(
    query(collection(firestore, "categories"), orderBy("id"))
  );

  return items.docs.map((doc) => doc.data());
};

// get deliveryCost
export const getDeliveryCost = async () => {
  console.log("1");
  const items = await getDocs(
    query(collection(firestore, "deliveryCost"), orderBy("id"))
  );
  console.log("2");

  return items.docs.map((doc) => doc.data());
};
