'use client';
import { db } from '@/src/firebase/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function useFetchCollection(collectionName) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = useCallback(() => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy('createdAt', 'desc'));
      onSnapshot(
        q,
        (snapshot) => {
          const allData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(allData);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          toast.error(error);
        },
        () => {}
      );
    } catch (error) {
      console.log(error);
    }
  }, [collectionName]);

  useEffect(() => {
    getCollection();
  }, [getCollection]);

  return { data, isLoading };
}

export default useFetchCollection;
