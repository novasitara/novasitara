import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from './supabase';
import { companyInfo, CompanyInfo } from '../data/companyInfo';
import { insightsData, InsightArticle } from '../data/insights';

// Content tables added for the admin panel are not in the generated types yet.
const db = supabase as any;

export interface SiteLinkRow {
  id: string;
  group_name: string;
  label_en: string;
  label_de: string | null;
  url: string;
  sort_order: number;
  is_active: boolean;
}

export interface BlogPostRow {
  id: string;
  slug: string;
  title_en: string;
  title_de: string | null;
  category_en: string | null;
  category_de: string | null;
  excerpt_en: string | null;
  excerpt_de: string | null;
  content_en: string | null;
  content_de: string | null;
  image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_at: string;
}

interface SiteContentState {
  overrides: Record<string, any>;
  links: SiteLinkRow[];
  posts: BlogPostRow[];
  loaded: boolean;
}

const SiteContentContext = createContext<SiteContentState>({ overrides: {}, links: [], posts: [], loaded: false });

// Every query fails soft: if Supabase is unreachable or a table is missing,
// the website keeps rendering its built-in content.
export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SiteContentState>({ overrides: {}, links: [], posts: [], loaded: false });

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      db.from('site_content').select('key,value'),
      db.from('site_links').select('*').eq('is_active', true).order('sort_order', { ascending: true }),
      db.from('blog_posts').select('*').eq('is_published', true).order('published_at', { ascending: false }),
    ])
      .then(([content, links, posts]: any[]) => {
        if (cancelled) return;
        const overrides: Record<string, any> = {};
        (content.data ?? []).forEach((row: any) => { overrides[row.key] = row.value; });
        setState({ overrides, links: links.data ?? [], posts: posts.data ?? [], loaded: true });
      })
      .catch(() => { if (!cancelled) setState((s) => ({ ...s, loaded: true })); });
    return () => { cancelled = true; };
  }, []);

  return <SiteContentContext.Provider value={state}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => useContext(SiteContentContext);

/** Website text overrides: rows keyed `text.<path>` with value { en, de }. */
export function applyTextOverrides<T>(base: T, overrides: Record<string, any>, lang: 'EN' | 'DE'): T {
  const keys = Object.keys(overrides).filter((k) => k.startsWith('text.'));
  if (keys.length === 0) return base;
  const copy: any = JSON.parse(JSON.stringify(base));
  keys.forEach((key) => {
    const text = overrides[key]?.[lang.toLowerCase()];
    if (typeof text !== 'string' || text.trim() === '') return;
    const path = key.slice(5).split('.');
    let node = copy;
    for (let i = 0; i < path.length - 1; i++) {
      node = node?.[path[i]];
      if (node === undefined) return;
    }
    if (node && typeof node[path[path.length - 1]] === 'string') node[path[path.length - 1]] = text;
  });
  return copy;
}

/** Contact details: row `company` with { phone_india, phone_germany, email, linkedin, hours_weekdays, hours_weekends }. */
export function useCompanyInfo(): CompanyInfo {
  const { overrides } = useSiteContent();
  return useMemo(() => {
    const c = overrides['company'] ?? {};
    const pick = (v: unknown, fallback: string) => (typeof v === 'string' && v.trim() ? v.trim() : fallback);
    return {
      ...companyInfo,
      phones: {
        india: pick(c.phone_india, companyInfo.phones.india),
        germany: pick(c.phone_germany, companyInfo.phones.germany),
      },
      email: pick(c.email, companyInfo.email),
      linkedin: pick(c.linkedin, companyInfo.linkedin),
      businessHours: {
        weekdays: pick(c.hours_weekdays, companyInfo.businessHours.weekdays),
        weekends: pick(c.hours_weekends, companyInfo.businessHours.weekends),
      },
    };
  }, [overrides]);
}

/** Replaceable images: rows keyed `image.<name>` with value { url }. */
export function useSiteImage(name: string, fallback: string): string {
  const { overrides } = useSiteContent();
  const url = overrides[`image.${name}`]?.url;
  return typeof url === 'string' && url ? url : fallback;
}

export interface ResolvedLink {
  label: string;
  path: string;
  external: boolean;
}

/** Links for a group (`navbar`, `footer`) edited in admin; falls back to the built-in list. */
export function useSiteLinks(group: string, defaults: { label: string; path: string }[], language: 'EN' | 'DE'): ResolvedLink[] {
  const { links } = useSiteContent();
  return useMemo(() => {
    const rows = links.filter((l) => l.group_name === group && l.is_active);
    if (rows.length === 0) return defaults.map((d) => ({ ...d, external: /^(https?:|mailto:|tel:)/i.test(d.path) }));
    return rows.map((l) => ({
      label: (language === 'DE' && l.label_de) || l.label_en,
      path: l.url,
      external: /^(https?:|mailto:|tel:)/i.test(l.url),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links, group, language, JSON.stringify(defaults)]);
}

const ACCENTS = ['#8F5CE6', '#FFB629', '#E86BCD', '#FF351A'];

export interface InsightWithContent extends InsightArticle {
  hasPage?: boolean;
}

/** Blog posts from the admin; falls back to the built-in articles when none are published. */
export function useInsights(): InsightWithContent[] {
  const { posts } = useSiteContent();
  return useMemo(() => {
    if (posts.length === 0) return insightsData;
    return posts.map((p, i) => {
      const words = (p.content_en ?? p.excerpt_en ?? '').trim().split(/\s+/).filter(Boolean).length;
      const mins = Math.max(1, Math.round(words / 200));
      const date = new Date(p.published_at ?? p.created_at);
      return {
        id: p.slug,
        slug: p.slug,
        titleEn: p.title_en,
        titleDe: p.title_de || p.title_en,
        categoryEn: (p.category_en ?? '').toUpperCase(),
        categoryDe: (p.category_de || p.category_en || '').toUpperCase(),
        readTimeEn: `${mins} min read`,
        readTimeDe: `${mins} Min. Lesezeit`,
        excerptEn: p.excerpt_en ?? '',
        excerptDe: p.excerpt_de || p.excerpt_en || '',
        image: p.image_url || insightsData[i % insightsData.length].image,
        accentColor: ACCENTS[i % ACCENTS.length],
        dateEn: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        dateDe: date.toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' }),
        hasPage: Boolean(p.content_en),
      };
    });
  }, [posts]);
}
