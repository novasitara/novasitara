import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles, Cpu, Layers, Boxes, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { insightsData } from '../../data/insights';
import { useLanguage } from '../../context/LanguageContext';

export const InsightsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Minimum swipe distance required in pixels
  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setMobileSlideIndex((prev) => (prev + 1) % insightsData.length);
    } else if (isRightSwipe) {
      setMobileSlideIndex((prev) => (prev - 1 + insightsData.length) % insightsData.length);
    }
  };

  const handlePrev = () => {
    setMobileSlideIndex((prev) => (prev - 1 + insightsData.length) % insightsData.length);
  };

  const handleNext = () => {
    setMobileSlideIndex((prev) => (prev + 1) % insightsData.length);
  };

  const getArticleVisualIcon = (id: string) => {
    switch (id) {
      case 'ai-enterprise-tech':
        return <Cpu size={28} color="#FFFFFF" />;
      case 'flexible-staffing':
        return <Boxes size={28} color="#FFFFFF" />;
      case 'sap-challenges':
        return <Layers size={28} color="#FFFFFF" />;
      case 'remote-teams':
        return <Users size={28} color="#FFFFFF" />;
      default:
        return <Sparkles size={28} color="#FFFFFF" />;
    }
  };

  const getBackgroundGradient = (id: string) => {
    switch (id) {
      case 'ai-enterprise-tech':
        return 'linear-gradient(135deg, #4A1D75 0%, #8F5CE6 100%)';
      case 'flexible-staffing':
        return 'linear-gradient(135deg, #7A4B00 0%, #FFB629 100%)';
      case 'sap-challenges':
        return 'linear-gradient(135deg, #731A5E 0%, #E86BCD 100%)';
      case 'remote-teams':
        return 'linear-gradient(135deg, #801406 0%, #FF351A 100%)';
      default:
        return 'linear-gradient(135deg, #2D1540 0%, #864EA8 100%)';
    }
  };

  const activeMobileArticle = insightsData[mobileSlideIndex];

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        paddingTop: 'clamp(4.5rem, 7vw, 6.5rem)',
        paddingBottom: 'clamp(5rem, 8vw, 7.5rem)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                color: '#864EA8',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 400ms ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <Sparkles size={15} color="#864EA8" />
              <span>{language === 'DE' ? 'PERSPEKTIVEN & WISSEN' : 'PERSPECTIVES & INSIGHTS'}</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.1rem, 4.2vw, 3.25rem)',
                color: '#000000',
                lineHeight: 1.15,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                margin: 0,
                overflowWrap: 'break-word',
                wordBreak: 'normal',
              }}
            >
              <span className="text-mask-wrapper">
                <span className={`text-mask-line ${isVisible ? 'is-visible' : ''}`}>
                  {language === 'DE' ? 'Aktuelle Einblicke in' : 'Featured Insights on'}
                </span>
              </span>
              <span className="text-mask-wrapper">
                <span
                  className={`text-mask-line ${isVisible ? 'is-visible' : ''}`}
                  style={{ color: '#864EA8', transitionDelay: '150ms' }}
                >
                  {language === 'DE' ? 'Technologie & Staffing.' : 'Enterprise & Staffing.'}
                </span>
              </span>
            </h2>
          </div>

          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 500ms ease 200ms',
            }}
          >
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#864EA8',
                padding: '0.65rem 1.25rem',
                borderRadius: '12px',
                backgroundColor: '#FAF5FF',
                border: '1px solid #E9D5FF',
                textDecoration: 'none',
                transition: 'all 180ms ease',
              }}
            >
              <span>{language === 'DE' ? 'Alle Fachartikel ansehen' : 'Explore All Knowledge'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* 1. DESKTOP & TABLET VIEW: 4 Staggered Grid Cards */}
        <div className="insights-desktop-grid">
          {insightsData.map((article, idx) => {
            const isStaggered = idx % 2 === 1;

            return (
              <div
                key={article.id}
                className={`insight-article-card ${isStaggered ? 'is-staggered' : ''}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 600ms ease ${200 + idx * 120}ms, transform 600ms ease ${200 + idx * 120}ms`,
                }}
              >
                {/* Top Image Container: 38px rounded top corners, cover */}
                <div
                  style={{
                    width: '100%',
                    height: '220px',
                    borderTopLeftRadius: '38px',
                    borderTopRightRadius: '38px',
                    borderBottomLeftRadius: '0px',
                    borderBottomRightRadius: '0px',
                    overflow: 'hidden',
                    background: getBackgroundGradient(article.id),
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.85,
                    }}
                  >
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {getArticleVisualIcon(article.id)}
                    </div>
                  </div>

                  <img
                    src={article.image}
                    alt={language === 'DE' ? article.titleDe : article.titleEn}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      position: 'relative',
                      zIndex: 2,
                      transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="insight-img-zoom"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.25) 100%)',
                      zIndex: 3,
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Coloured Content Panel Overlapping the Image by ~40px */}
                <div
                  style={{
                    marginTop: '-40px',
                    position: 'relative',
                    zIndex: 4,
                    backgroundColor: article.accentColor,
                    borderRadius: '24px',
                    padding: '1.75rem 1.5rem',
                    color: '#FFFFFF',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '260px',
                    marginRight: '8px',
                    marginLeft: '8px',
                  }}
                  className="insight-content-panel"
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        marginBottom: '0.85rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.725rem',
                          fontWeight: 800,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          backgroundColor: 'rgba(0, 0, 0, 0.22)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '12px',
                          color: '#FFFFFF',
                        }}
                      >
                        {language === 'DE' ? article.categoryDe : article.categoryEn}
                      </span>

                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'rgba(255, 255, 255, 0.9)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <Clock size={13} />
                        {language === 'DE' ? article.readTimeDe : article.readTimeEn}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 'clamp(1.2rem, 1.8vw, 1.35rem)',
                        fontWeight: 800,
                        lineHeight: 1.3,
                        color: '#FFFFFF',
                        marginBottom: '0.65rem',
                        letterSpacing: '-0.02em',
                        overflowWrap: 'break-word',
                        wordBreak: 'normal',
                      }}
                    >
                      {language === 'DE' ? article.titleDe : article.titleEn}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.55,
                        color: 'rgba(255, 255, 255, 0.92)',
                        margin: '0 0 1.25rem 0',
                        overflowWrap: 'break-word',
                        wordBreak: 'normal',
                      }}
                    >
                      {language === 'DE' ? article.excerptDe : article.excerptEn}
                    </p>
                  </div>

                  <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.25)' }}>
                    <Link
                      to="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        fontSize: '0.875rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        transition: 'gap 200ms ease',
                      }}
                      className="insight-read-link"
                    >
                      <span>{language === 'DE' ? 'Artikel lesen' : 'Read Article'}</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. MOBILE VIEW: Dedicated Interactive Card Slider with Tabs & Swipe */}
        <div className="insights-mobile-slider-wrapper">
          {/* Top Mobile Quick Selector Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1.25rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '4px',
            }}
            className="insights-mobile-tab-bar"
          >
            {insightsData.map((tabArticle, tabIdx) => {
              const isTabActive = tabIdx === mobileSlideIndex;
              return (
                <button
                  key={tabArticle.id}
                  type="button"
                  onClick={() => setMobileSlideIndex(tabIdx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '12px',
                    fontSize: '0.775rem',
                    fontWeight: isTabActive ? 800 : 600,
                    border: isTabActive ? `1.5px solid ${tabArticle.accentColor}` : '1px solid #E8E2EE',
                    backgroundColor: isTabActive ? tabArticle.accentColor : '#FFFFFF',
                    color: isTabActive ? '#FFFFFF' : '#4F4F5A',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    flexShrink: 0,
                    boxShadow: isTabActive ? `0 4px 12px ${tabArticle.accentColor}33` : 'none',
                  }}
                >
                  <span>{tabIdx + 1}.</span>
                  <span>{tabArticle.categoryEn.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Active Mobile Slide Container with Touch Swipe */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            key={`mobile-slide-${activeMobileArticle.id}`}
            style={{
              width: '100%',
              animation: 'fadeSlideCard 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Top Thumbnail Image */}
            <div
              style={{
                width: '100%',
                height: '210px',
                borderTopLeftRadius: '36px',
                borderTopRightRadius: '36px',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
                overflow: 'hidden',
                background: getBackgroundGradient(activeMobileArticle.id),
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.85,
                }}
              >
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {getArticleVisualIcon(activeMobileArticle.id)}
                </div>
              </div>

              <img
                src={activeMobileArticle.image}
                alt={language === 'DE' ? activeMobileArticle.titleDe : activeMobileArticle.titleEn}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  position: 'relative',
                  zIndex: 2,
                }}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.25) 100%)',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Overlapping Content Panel */}
            <div
              style={{
                marginTop: '-40px',
                position: 'relative',
                zIndex: 4,
                backgroundColor: activeMobileArticle.accentColor,
                borderRadius: '24px',
                padding: '1.75rem 1.35rem',
                color: '#FFFFFF',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px',
                marginRight: '6px',
                marginLeft: '6px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginBottom: '0.85rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.725rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      backgroundColor: 'rgba(0, 0, 0, 0.22)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                    }}
                  >
                    {language === 'DE' ? activeMobileArticle.categoryDe : activeMobileArticle.categoryEn}
                  </span>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Clock size={13} />
                    {language === 'DE' ? activeMobileArticle.readTimeDe : activeMobileArticle.readTimeEn}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    lineHeight: 1.3,
                    color: '#FFFFFF',
                    marginBottom: '0.65rem',
                    letterSpacing: '-0.02em',
                    overflowWrap: 'break-word',
                    wordBreak: 'normal',
                  }}
                >
                  {language === 'DE' ? activeMobileArticle.titleDe : activeMobileArticle.titleEn}
                </h3>

                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.55,
                    color: 'rgba(255, 255, 255, 0.92)',
                    margin: '0 0 1.25rem 0',
                    overflowWrap: 'break-word',
                    wordBreak: 'normal',
                  }}
                >
                  {language === 'DE' ? activeMobileArticle.excerptDe : activeMobileArticle.excerptEn}
                </p>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.25)' }}>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                  }}
                >
                  <span>{language === 'DE' ? 'Artikel lesen' : 'Read Article'}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Carousel Bottom Navigation & Indicator Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1.5rem',
              padding: '0.5rem 0.25rem',
            }}
          >
            {/* Dot indicators */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              {insightsData.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setMobileSlideIndex(dotIdx)}
                  style={{
                    width: dotIdx === mobileSlideIndex ? '28px' : '9px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: dotIdx === mobileSlideIndex ? insightsData[dotIdx].accentColor : '#D5CBDD',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 250ms ease',
                    padding: 0,
                  }}
                  aria-label={`Go to article ${dotIdx + 1}`}
                />
              ))}
              <span style={{ fontSize: '0.75rem', color: '#7E7E8E', marginLeft: '0.35rem', fontWeight: 700 }}>
                {mobileSlideIndex + 1} / {insightsData.length}
              </span>
            </div>

            {/* Previous / Next Arrow Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={handlePrev}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  border: '1.5px solid #DDD3E5',
                  backgroundColor: '#FFFFFF',
                  color: '#333333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                }}
                aria-label="Previous Article"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  border: '1.5px solid #DDD3E5',
                  backgroundColor: '#FFFFFF',
                  color: '#333333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                }}
                aria-label="Next Article"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Desktop & Tablet: Grid Display */
        .insights-desktop-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.75rem;
          align-items: start;
        }

        .insights-mobile-slider-wrapper {
          display: none;
        }

        .insight-article-card {
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 300ms ease, box-shadow 300ms ease;
        }

        .insight-article-card:hover .insight-img-zoom {
          transform: scale(1.04);
        }

        .insight-article-card:hover .insight-read-link {
          gap: 0.75rem;
        }

        /* Staggered Vertical Offset on Desktop (Cards 2 & 4) */
        @media (min-width: 992px) {
          .insight-article-card.is-staggered {
            margin-top: 38px !important;
          }
        }

        /* Tablet Layout (2 Columns) */
        @media (min-width: 768px) and (max-width: 991px) {
          .insights-desktop-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem !important;
          }
          .insight-article-card.is-staggered {
            margin-top: 0px !important;
          }
        }

        /* Mobile Layout: Full Interactive Slider */
        @media (max-width: 767px) {
          .insights-desktop-grid {
            display: none !important;
          }
          .insights-mobile-slider-wrapper {
            display: block !important;
          }
          .insights-mobile-tab-bar::-webkit-scrollbar {
            display: none;
          }
        }

        @keyframes fadeSlideCard {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};
