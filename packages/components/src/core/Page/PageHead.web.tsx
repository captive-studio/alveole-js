import { Asset } from 'expo-asset';
import Head from 'expo-router/head';
import type { PageProps } from './Page';

const favicon = Asset.fromModule(require('@/assets/images/icon.png')).uri;

export type PageHeadProps = PageProps;

export const PageHead = (props: PageHeadProps) => {
  const { title, description, og } = props;

  const descriptionValue = description ?? title;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={descriptionValue} />
      <meta property="og:title" content={og?.title ?? title} />
      <meta property="og:description" content={og?.description ?? descriptionValue} />
      <link rel="icon" type="image/png" href={favicon} />
    </Head>
  );
};
