import { Asset } from 'expo-asset';
import Head from 'expo-router/head';
import type { PageProps } from './Page.types';
import { usePageMeta } from './PageMetaContext';

const favicon = Asset.fromModule(require('@/assets/images/icon.png')).uri;

export type PageHeadProps = PageProps;

export const PageHead = (props: PageHeadProps) => {
  const { title, description, og, meta: pageMeta } = props;
  const { meta: contextMeta } = usePageMeta();

  const descriptionValue = description ?? title;
  const resolvedMeta = [...contextMeta, ...(pageMeta ?? [])];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={descriptionValue} />
      <meta property="og:title" content={og?.title ?? title} />
      <meta property="og:description" content={og?.description ?? descriptionValue} />
      <link rel="icon" type="image/png" href={favicon} />
      {resolvedMeta.map((metaProps, index) => (
        <meta key={index} {...metaProps} />
      ))}
    </Head>
  );
};
