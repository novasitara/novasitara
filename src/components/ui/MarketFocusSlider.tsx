import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Layers, Box, Users2, Code2, Users } from 'lucide-react';
import { marketSlidesData } from '../../data/marketSlides';
import { useLanguage } from '../../context/LanguageContext';

export const MarketFocusSlider: React.FC = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Auto-advance slides every 5 seconds (5000ms)
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % marketSlidesData.length);
      setSlideKey((k) => k + 1);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeIndex]);

  const handleSelectSlide = (idx: number) => {
    setActiveIndex(idx);
    setSlideKey((k) => k + 1);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + marketSlidesData.length) % marketSlidesData.length);
    setSlideKey((k) => k + 1);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % marketSlidesData.length);
    setSlideKey((k) => k + 1);
  };

  const currentSlide = marketSlidesData[activeIndex];

  const getSlideIcon = (id: string) => {
    switch (id) {
      case 'vistex':
        return <Layers size={16} />;
      case 'scm-logistics':
        return <Box size={16} />;
      case 'successfactors':
        return <Users2 size={16} />;
      case 'abap-engineering':
        return <Code2 size={16} />;
      case 'strategic-staffing':
        return <Users size={16} />;
      default:
        return <Sparkles size={16} />;
    }
  };

  const getShortTabLabel = (id: string) => {
    switch (id) {
      case 'vistex':
        return language === 'DE' ? 'Vistex (Aktiv)' : 'Vistex Practice';
      case 'scm-logistics':
        return 'SAP SCM / EWM';
      case 'successfactors':
        return 'SuccessFactors';
      case 'abap-engineering':
        return 'ABAP & Integration';
      case 'strategic-staffing':
        return language === 'DE' ? 'IT-Staffing' : 'Technology Staffing';
      default:
        return id;
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        width: '100%',
        marginBottom: '2.5rem',
        borderRadius: '20px',
        backgroundColor: '#FFFFFF',
        border: '1.5px solid #E8E2EE',
        boxShadow: '0 8px 24px rgba(134, 78, 168, 0.06)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 5-Second Animated Progress Bar */}
      <div
        key={`progress-${slideKey}-${isPaused}`}
        style={{
          height: '3px',
          backgroundColor: '#864EA8',
          width: isPaused ? '100%' : '0%',
          animation: isPaused ? 'none' : 'progress5s 5000ms linear forwards',
          opacity: isPaused ? 0.4 : 1,
          transition: isPaused ? 'opacity 200ms ease' : 'none',
        }}
      />

      {/* DESKTOP Tab Bar / Slide Switchers (hidden on mobile to prevent icon clipping) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.65rem 0.85rem',
          backgroundColor: '#FAF8FC',
          borderBottom: '1px solid #ECE6F2',
          overflowX: 'hidden',
        }}
        className="market-slider-desktop-tabs"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', paddingRight: '0.75rem', borderRight: '1px solid #E4DCEB', flexShrink: 0 }}>
          <Sparkles size={15} color="#864EA8" />
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: '#864EA8', textTransform: 'uppercase' }}>
            {language === 'DE' ? 'MARKTFOKUS:' : 'MARKET FOCUS:'}
          </span>
        </div>

        {marketSlidesData.map((slide, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => handleSelectSlide(idx)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: isActive ? 700 : 600,
                border: isActive ? '1px solid #864EA8' : '1px solid transparent',
                backgroundColor: isActive ? '#864EA8' : 'transparent',
                color: isActive ? '#FFFFFF' : '#4F4F5A',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                flexShrink: 0,
                boxShadow: isActive ? '0 2px 8px rgba(134, 78, 168, 0.25)' : 'none',
              }}
            >
              {getSlideIcon(slide.id)}
              <span>{getShortTabLabel(slide.id)}</span>
              {slide.isCurrentPrimary && (
                <span
                  style={{
                    fontSize: '0.65rem',
                    padding: '0.1rem 0.35rem',
                    borderRadius: '6px',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#F0E6F7',
                    color: isActive ? '#FFFFFF' : '#864EA8',
                    fontWeight: 800,
                  }}
                >
                  ★
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* MOBILE Header Bar (Clean, shows EXACT current active category dynamically with zero icon clipping) */}
      <div
        style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 0.85rem',
          backgroundColor: '#FAF8FC',
          borderBottom: '1px solid #ECE6F2',
          width: '100%',
        }}
        className="market-slider-mobile-header"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Sparkles size={14} color="#864EA8" />
          <span style={{ fontSize: '0.725rem', fontWeight: 800, letterSpacing: '0.08em', color: '#864EA8', textTransform: 'uppercase' }}>
            {language === 'DE' ? 'MARKTFOKUS' : 'MARKET FOCUS'}
          </span>
        </div>

        {/* Dynamic active category badge that automatically changes every 5s */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '10px',
            backgroundColor: '#864EA8',
            color: '#FFFFFF',
            fontSize: '0.775rem',
            fontWeight: 700,
            boxShadow: '0 2px 8px rgba(134, 78, 168, 0.25)',
          }}
        >
          {getSlideIcon(currentSlide.id)}
          <span>{getShortTabLabel(currentSlide.id)}</span>
          <span style={{ fontSize: '0.65rem', opacity: 0.8, marginLeft: '0.2rem' }}>
            ({activeIndex + 1}/{marketSlidesData.length})
          </span>
        </div>
      </div>

      {/* Active Slide Body */}
      <div
        key={`slide-${activeIndex}`}
        style={{
          padding: 'clamp(1.25rem, 3.5vw, 2rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '1.5rem',
          alignItems: 'center',
          minHeight: '180px',
          position: 'relative',
          animation: 'fadeSlideIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Left / Info Side */}
        <div style={{ gridColumn: 'span 12' }} className="market-slide-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.725rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                padding: '0.2rem 0.65rem',
                borderRadius: '20px',
                backgroundColor: '#F3E8FF',
                color: '#864EA8',
                border: '1px solid #E9D5FF',
              }}
            >
              {language === 'DE' ? currentSlide.badgeDe : currentSlide.badgeEn}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#6A6A78', fontWeight: 600 }}>
              {language === 'DE' ? 'Zielgruppe:' : 'Target Audience:'}{' '}
              <strong style={{ color: '#111116' }}>{language === 'DE' ? currentSlide.targetMarketDe : currentSlide.targetMarketEn}</strong>
            </span>
          </div>

          <h3
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.65rem)',
              color: '#080808',
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
              wordBreak: 'break-word',
            }}
          >
            {language === 'DE' ? currentSlide.titleDe : currentSlide.titleEn}
          </h3>

          <p
            style={{
              fontSize: '0.925rem',
              color: '#4B4B58',
              lineHeight: 1.55,
              margin: '0 0 1rem 0',
              maxWidth: '780px',
            }}
          >
            {language === 'DE' ? currentSlide.subtitleDe : currentSlide.subtitleEn}
          </p>

          {/* Tags & Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {currentSlide.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.775rem',
                    fontWeight: 600,
                    color: '#864EA8',
                    backgroundColor: '#FAF5FF',
                    border: '1px solid #F3E8FF',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '8px',
                  }}
                >
                  ✓ {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', maxWidth: '280px' }}>
              <Link
                to={currentSlide.actionLink}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: '#864EA8',
                  backgroundColor: '#F7F2FA',
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #EBDDF5',
                  transition: 'all 150ms ease',
                  width: '100%',
                }}
              >
                <span>{language === 'DE' ? currentSlide.actionTextDe : currentSlide.actionTextEn}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Line & Prev/Next Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.45rem 1rem',
          backgroundColor: '#FAF8FC',
          borderTop: '1px solid #ECE6F2',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {marketSlidesData.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => handleSelectSlide(dotIdx)}
              style={{
                width: dotIdx === activeIndex ? '24px' : '8px',
                height: '6px',
                borderRadius: '4px',
                backgroundColor: dotIdx === activeIndex ? '#864EA8' : '#D5CBDD',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                padding: 0,
              }}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
          <span style={{ fontSize: '0.75rem', color: '#7E7E8E', marginLeft: '0.5rem', fontFamily: 'monospace', fontWeight: 600 }}>
            {activeIndex + 1} / {marketSlidesData.length} (5s)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            type="button"
            onClick={handlePrev}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              border: '1px solid #DDD3E5',
              backgroundColor: '#FFFFFF',
              color: '#333333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              border: '1px solid #DDD3E5',
              backgroundColor: '#FFFFFF',
              color: '#333333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Next Slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .market-slider-desktop-tabs {
            display: flex !important;
          }
          .market-slider-mobile-header {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .market-slider-desktop-tabs {
            display: none !important;
          }
          .market-slider-mobile-header {
            display: flex !important;
          }
        }
        @keyframes progress5s {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
