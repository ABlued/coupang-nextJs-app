import Product from '@/src/components/product/Product';
import ProductFilter from '@/src/components/product/productFilter/ProductFilter';
import Slider from '@/src/components/slider/Slider';

export default function Home() {
  return (
    <>
      <Slider />
      <Product />
    </>
  );
}
