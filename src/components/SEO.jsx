import Head from 'next/head';
import siteMetadata from '../data/siteMetadata';

export function PageSEO({ title, description, canonical: canonicalPath }) {
  const pageTitle = title ? `${title} - ${siteMetadata.author}` : siteMetadata.title;
  const pageDesc = description || siteMetadata.description;
  const canonicalUrl = canonicalPath
    ? (canonicalPath.startsWith('http') ? canonicalPath : `${siteMetadata.siteUrl || ''}${canonicalPath}`)
    : null;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Head>
  );
}

export const BlogSEO = ({ title, description, publishedAt, url }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="article:published_time" content={publishedAt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default function SEO({
  title,
  description,
  ogImage = '/og-image.jpg',
  canonical,
}) {
  const siteTitle = 'Carla Castillo - Portfolio'
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  )
} 