'use client';

import { db } from '@/firebase/firebase';
import { doc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

function useFetchDocument(collectionName, documentID) {
  const [document, setDocument] = useState(null);

  const getDocument = useCallback(async () => {
    const docRef = doc(db, collectionName, documentID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: documentID,
        ...docSnap.data(),
      };
      setDocument(obj);
    } else {
      toast.error('Document not found');
    }
  }, [collectionName, documentID]);

  useEffect(() => {
    getDocument();
  }, [getDocument]);

  return { document };
}

export default useFetchDocument;
