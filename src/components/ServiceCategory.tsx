import React from 'react';
import { ServiceCategoryData } from '../data/services';
import { useReveal } from '../hooks/useReveal';
import { ServiceCard } from './ServiceCard';

interface ServiceCategoryProps {
  category: ServiceCategoryData;
  selectedServiceIds: string[];
  onToggleService: (id: string) => void;
  effectiveDiscountPercent: number;
  isPreviewOnly: boolean;
  recommendedServiceIds?: string[];
  roiRecommendedServiceId?: string | null;
  showDivider?: boolean;
}

export const ServiceCategory: React.FC<ServiceCategoryProps> = ({
  category,
  selectedServiceIds,
  onToggleService,
  effectiveDiscountPercent,
  isPreviewOnly,
  recommendedServiceIds = [],
  roiRecommendedServiceId = null,
  showDivider = true,
}) => {
  const { ref, isVisible } = useReveal<HTMLDivElement>(0.05);

  const gridClass =
    category.layout === '2x2'
      ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

  return (
    <div
      id={`category-${category.id}`}
      ref={ref}
      className={`scroll-mt-24 reveal-section ${isVisible ? 'is-visible' : ''} ${
        showDivider
          ? 'pb-14 mb-14 border-b border-slate-200 dark:border-white/10'
          : ''
      }`}
    >
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex flex-wrap items-baseline gap-2.5">
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#3B82F6]">
              {category.number}
            </span>
            <span>{category.title}</span>
          </h3>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {category.description}
          </p>
        </div>

        {category.sectionNote && (
          <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 md:text-right shrink-0">
            {category.sectionNote}
          </p>
        )}
      </div>

      <div className={gridClass}>
        {category.services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedServiceIds.includes(service.id)}
            onToggle={onToggleService}
            effectiveDiscountPercent={effectiveDiscountPercent}
            isPreviewOnly={isPreviewOnly}
            isIndustryRecommended={recommendedServiceIds.includes(service.id)}
            isRoiRecommended={roiRecommendedServiceId === service.id}
          />
        ))}
      </div>
    </div>
  );
};
