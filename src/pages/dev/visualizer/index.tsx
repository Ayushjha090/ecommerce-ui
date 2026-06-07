import {
  ArrowRight,
  BadgePercent,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Check,
  ClipboardList,
  CreditCard,
  Heart,
  LayoutTemplate,
  MapPin,
  PackageCheck,
  Search,
  ShoppingCart,
  Star,
  SlidersHorizontal,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

import {
  currentVisualizationSpec,
  type VisualizationKind,
  type VisualizationSpec,
} from "./visualizationSpec";

const toneClasses: Record<
  VisualizationSpec["stats"][number]["tone"],
  string
> = {
  accent: "bg-accent-50 text-accent-600 border-accent-500/20",
  brand: "bg-brand-50 text-brand-900 border-brand-500/20",
  success: "bg-success-50 text-success-600 border-success-500/20",
  warning: "bg-warning-50 text-warning-600 border-warning-500/20",
};

const kindIcon: Record<VisualizationKind, typeof Boxes> = {
  campaign: BadgePercent,
  checkout: CreditCard,
  comparison: LayoutTemplate,
  dashboard: ClipboardList,
  landing: Boxes,
};

const VisualizerPage = () => {
  const spec = currentVisualizationSpec;
  const Icon = kindIcon[spec.kind];
  const activeSlide = spec.heroSlides?.[0];

  return (
    <div className="min-h-screen bg-surface-50 text-surface-900">
      <header className="sticky top-0 z-30 border-b border-surface-800 bg-surface-900 text-surface-50 shadow-soft">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 lg:px-6">
          <div className="flex min-w-max items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-600">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold leading-none">
                ShopDeck
              </p>
              <p className="text-xs text-surface-200">customer preview</p>
            </div>
          </div>

          <button className="hidden min-w-max items-center gap-2 rounded-md px-2 py-1 text-left text-xs text-surface-100 transition-colors hover:bg-white/10 md:flex">
            <MapPin className="h-4 w-4" />
            <span>
              Deliver to
              <strong className="block text-sm text-white">New Delhi</strong>
            </span>
          </button>

          <div className="flex min-w-0 flex-1 items-center rounded-md bg-white">
            <select
              aria-label="Search category"
              className="hidden h-10 rounded-l-md border-r border-surface-200 bg-surface-100 px-3 text-sm text-surface-800 outline-none sm:block"
            >
              <option>All</option>
              <option>Electronics</option>
              <option>Fashion</option>
            </select>
            <input
              aria-label="Search products"
              className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-surface-900 outline-none"
              placeholder="Search for products, brands and more"
            />
            <button
              aria-label="Search"
              className="flex h-10 w-12 items-center justify-center rounded-r-md bg-warning-500 text-surface-900 transition-colors hover:bg-warning-600"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              Sign in
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              Orders
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<ShoppingCart className="h-4 w-4" />}
            >
              Cart
            </Button>
          </div>
        </div>

        <nav className="border-t border-white/10 bg-surface-800">
          <div className="scrollbar-admin mx-auto flex h-10 max-w-7xl items-center gap-2 overflow-x-auto px-4 text-sm lg:px-6">
            {spec.navItems?.map((item) => (
              <button
                key={item}
                className="min-w-max rounded-md px-3 py-1.5 font-medium text-surface-100 transition-colors hover:bg-white/10"
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-5 px-4 py-5 lg:px-6">
        <section className="overflow-hidden rounded-lg border border-surface-200 bg-white shadow-soft">
          <div className="grid min-h-[340px] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="relative bg-brand-900 p-6 text-white md:p-8">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-sm font-semibold text-brand-100">
                  <Wand2 className="h-4 w-4" />
                  {activeSlide?.eyebrow}
                </div>
                <h1 className="mt-5 font-heading text-3xl font-bold md:text-5xl">
                  {activeSlide?.title}
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-6 text-brand-100 md:text-base">
                  {activeSlide?.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {spec.actions.map((action) => (
                    <Button
                      key={action.label}
                      variant={action.variant}
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-6 right-6 hidden w-52 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur md:block">
                <p className="text-xs font-semibold uppercase text-brand-100">
                  {activeSlide?.offer}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {spec.stats.map((stat) => (
                    <div key={stat.label} className="rounded-md bg-white/10 p-2">
                      <p className="text-lg font-bold">{stat.value}</p>
                      <p className="text-[11px] text-brand-100">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-surface-100 p-4 md:p-5 lg:grid-cols-1">
              {spec.heroSlides?.map((slide, index) => (
                <button
                  key={slide.title}
                  className={cn(
                    "rounded-lg border bg-white p-4 text-left transition-shadow hover:shadow-hover",
                    index === 0 ? "border-brand-500" : "border-surface-200",
                  )}
                >
                  <p className="text-xs font-semibold uppercase text-brand-600">
                    {slide.eyebrow}
                  </p>
                  <p className="mt-2 font-heading text-sm font-bold text-surface-900 md:text-base">
                    {slide.offer}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-surface-800">
                    {slide.title}
                  </p>
                </button>
              ))}
              <div className="col-span-3 flex justify-center gap-2 lg:col-span-1">
                <Button size="icon" variant="secondary" aria-label="Previous slide">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" aria-label="Next slide">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-lg border border-surface-200 bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between border-b border-surface-200 pb-3">
              <div>
                <p className="text-xs font-semibold uppercase text-surface-400">
                  Filters
                </p>
                <h2 className="font-heading text-lg font-bold text-surface-900">
                  Refine results
                </h2>
              </div>
              <SlidersHorizontal className="h-5 w-5 text-brand-600" />
            </div>

            <div className="mt-4 space-y-5">
              {spec.filters?.map((filter) => (
                <div key={filter.label}>
                  <h3 className="text-sm font-semibold text-surface-900">
                    {filter.label}
                  </h3>
                  <div className="mt-2 space-y-2">
                    {filter.options.map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2 text-sm text-surface-800"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-surface-300 accent-brand-600"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className="space-y-4">
            <div className="rounded-lg border border-surface-200 bg-white p-4 shadow-soft">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-surface-400">
                      {spec.kind} visualization
                    </p>
                    <h2 className="font-heading text-xl font-bold text-surface-900">
                      {spec.title}
                    </h2>
                    <p className="mt-1 text-sm text-surface-800">{spec.intent}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {spec.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className={cn(
                        "rounded-md border px-3 py-2",
                        toneClasses[stat.tone],
                      )}
                    >
                      <p className="text-sm font-bold">{stat.value}</p>
                      <p className="text-[11px] font-semibold uppercase opacity-75">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {spec.products.map((product) => (
                <article
                  key={product.name}
                  className="flex min-h-80 flex-col rounded-lg border border-surface-200 bg-white p-4 shadow-soft transition-shadow hover:shadow-hover"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md bg-surface-100 text-brand-600">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#eef2ff_0%,#ffffff_48%,#fff1f2_100%)]" />
                    <PackageCheck className="relative h-12 w-12" />
                    <button
                      aria-label={`Save ${product.name}`}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-white text-surface-800 shadow-soft transition-colors hover:text-accent-600"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-heading text-lg font-semibold text-surface-900">
                        {product.name}
                      </h2>
                      <div className="mt-1 flex items-center gap-1 text-sm text-surface-800">
                        <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
                        {product.metric}
                      </div>
                    </div>
                    <span className="rounded-md bg-accent-50 px-2 py-1 text-xs font-bold text-accent-600">
                      {product.badge}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-surface-800">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between border-t border-surface-200 pt-4">
                    <p className="font-heading text-xl font-bold text-brand-900">
                      {product.price}
                    </p>
                    <Button size="icon" aria-label={`Select ${product.name}`}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default VisualizerPage;
