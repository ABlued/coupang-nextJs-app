import React from 'react';
import styles from './ProductItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { priceFormat } from '@/src/utils/priceFormat';
import { Rating } from 'react-simple-star-rating';
import rocketBadgeIcon from '@/src/assets/badge-rocket.svg';
import useFetchDocuments from '@/src/hooks/useFetchDocuments';

function ProductItem({ id, name, price, imageURL }) {
  const { documents } = useFetchDocuments('reviews', ['productID', '==', id]);

  let productRating = 0;
  documents.map((doc) => {
    productRating += doc.rating;
  });
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substr(0, n - 1) + '...';
      return shortenedText;
    }
    return text;
  };

  return (
    <div className={styles.grid}>
      <Link href={`/product-details/${id}`}>
        <div className={styles.img}>
          <Image src={imageURL} alt={name} width={265} height={265} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{shortenText(name, 10)}</p>
          <em>
            <strong style={{ color: '#cb1400 ' }}>{priceFormat(price)}</strong>
            원 <Image src={rocketBadgeIcon} alt={'로켓 배송'} />
          </em>
          <div>
            <Rating
              size={17}
              readonly
              initialValue={Number.isNaN(productRating)}
            />
            <span className={styles.ratingCount ?? 0}>{documents}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
