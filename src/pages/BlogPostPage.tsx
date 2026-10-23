import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';
import { useSiteContent } from '../lib/siteContent';
import { NotFoundPage } from './NotFoundPage';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const { posts, loaded } = useSiteContent();
  const post = posts.find((p) => p.slug === slug);

  if (!loaded) {
    return <main className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>Loading…</main>;
  }
  if (!post) return <NotFoundPage />;

  const isDe = language === 'DE';
  const title = (isDe && post.title_de) || post.title_en;
  const category = (isDe && post.category_de) || post.category_en;
  const body = (isDe && post.content_de) || post.content_en || '';
  const date = new Date(post.published_at ?? post.created_at).toLocaleDateString(isDe ? 'de-DE' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <>
      <SEO
        title={`${post.seo_title || title} | Nova Sitara`}
        description={post.seo_description || post.excerpt_en || title}
      />
      <main>
        <article className="container" style={{ maxWidth: '780px', paddingBlock: 'clamp(3rem, 6vw, 5rem)' }}>
          <Link to="/#insights" style={{ display: 'flex', width: 'fit-content', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '1.5rem' }}>
            <ArrowLeft size={16} /> {isDe ? 'Zurück' : 'Back'}
          </Link>
          {category && <div className="eyebrow">{category}</div>}
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '0.75rem', color: 'var(--color-text-heading)' }}>
            {title}
          </h1>
          <div style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>{date}</div>
          {post.image_url && (
            <img src={post.image_url} alt={title} style={{ width: '100%', borderRadius: 'var(--radius-xl)', marginBottom: '2rem' }} />
          )}
          {/* Plain text only: paragraphs split on blank lines, no HTML is rendered. */}
          {body.split(/\n{2,}/).map((para, i) => (
            <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--color-text-body)', marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>
              {para}
            </p>
          ))}
        </article>
      </main>
    </>
  );
};
