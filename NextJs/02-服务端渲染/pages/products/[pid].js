import { Fragment } from 'react';

import path from 'path';
import fs from 'fs/promises';


function ProductDetailPage (props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData () {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps (context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
    // return {
    //   props: {
    //     loadedProduct: { "id": params.pid, "title": `Product ${params.pid}`, "description": "This is product 4" },
    //   },
    // }
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

/*
  预先构建好已知数据的页面
  如果构建的页面数据为未知的 那么重新build
 */
export async function getStaticPaths () {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));
  console.log('pathsWithParams', pathsWithParams);
  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetailPage;