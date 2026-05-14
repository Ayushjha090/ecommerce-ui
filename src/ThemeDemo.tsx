import {
  ShoppingBag,
  ArrowRight,
  Star,
  Tag,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
} from "lucide-react";

const ThemeDemo = () => {
  return (
    <div className="min-h-screen bg-surface-50 text-surface-900 font-sans pb-24">
      {/* Navigation Simulation */}
      <nav className="bg-white shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-brand-600" />
            <span className="font-heading font-bold text-xl text-brand-900">
              E-Commerce
            </span>
          </div>
          <div className="space-x-4 text-sm font-medium text-surface-800">
            <a href="#" className="hover:text-brand-600 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-brand-600 transition-colors">
              Products
            </a>
            <a href="#" className="hover:text-brand-600 transition-colors">
              Categories
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-12 space-y-20">
        {/* Section 1: Typography */}
        <section>
          <div className="border-b border-surface-200 pb-4 mb-8">
            <h2 className="text-3xl font-heading font-bold text-brand-900">
              Typography
            </h2>
            <p className="text-surface-800 mt-2">
              Outfit (Headings) & Inter (Body)
            </p>
          </div>
          <div className="space-y-6 bg-white p-8 rounded-2xl shadow-soft">
            <div>
              <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Heading 1
              </span>
              <h1 className="text-5xl font-heading font-extrabold text-brand-900 mt-1">
                Discover The Latest Tech
              </h1>
            </div>
            <div>
              <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Heading 2
              </span>
              <h2 className="text-4xl font-heading font-bold text-surface-900 mt-1">
                Trending Products
              </h2>
            </div>
            <div>
              <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Heading 3
              </span>
              <h3 className="text-2xl font-heading font-semibold text-surface-900 mt-1">
                Product Specifications
              </h3>
            </div>
            <div>
              <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Body Large
              </span>
              <p className="text-lg text-surface-800 leading-relaxed mt-1">
                Experience unparalleled performance with our latest collection.
                Designed for professionals who demand the best in their everyday
                workflow.
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Body Standard
              </span>
              <p className="text-base text-surface-800 leading-relaxed mt-1">
                This is standard body text used for product descriptions,
                reviews, and general information across the platform. It remains
                highly legible at small sizes.
              </p>
            </div>
          </div>
        </section>
        {/* Section 1.5: Spacing & Layout */}
        <section>
          <div className="border-b border-surface-200 pb-4 mb-8">
            <h2 className="text-3xl font-heading font-bold text-brand-900">
              Spacing, Margin & Padding
            </h2>
            <p className="text-surface-800 mt-2">
              Visualizing the 4-point grid system used throughout the design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-2xl shadow-soft">
            {/* Paddings */}
            <div>
              <h3 className="font-heading font-semibold text-lg text-surface-900 mb-4">
                Padding Scale
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm text-surface-500 text-right">
                    p-2 (8px)
                  </div>
                  <div className="bg-brand-100 p-2 rounded inline-block">
                    <div className="bg-brand-500 h-6 w-16 rounded-sm"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm text-surface-500 text-right">
                    p-4 (16px)
                  </div>
                  <div className="bg-brand-100 p-4 rounded inline-block">
                    <div className="bg-brand-500 h-6 w-16 rounded-sm"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm text-surface-500 text-right">
                    p-6 (24px)
                  </div>
                  <div className="bg-brand-100 p-6 rounded inline-block">
                    <div className="bg-brand-500 h-6 w-16 rounded-sm"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-sm text-surface-500 text-right">
                    p-8 (32px)
                  </div>
                  <div className="bg-brand-100 p-8 rounded inline-block">
                    <div className="bg-brand-500 h-6 w-16 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Margins/Gaps */}
            <div>
              <h3 className="font-heading font-semibold text-lg text-surface-900 mb-4">
                Gap / Spacing Scale
              </h3>
              <div className="space-y-4 flex flex-col items-start">
                <div className="flex items-center">
                  <div className="w-24 text-sm text-surface-500 text-right mr-4">
                    gap-2 (8px)
                  </div>
                  <div className="flex gap-2 bg-surface-100 p-2 rounded">
                    <div className="bg-brand-500 h-6 w-8 rounded-sm"></div>
                    <div className="bg-brand-500 h-6 w-8 rounded-sm"></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm text-surface-500 text-right mr-4">
                    gap-4 (16px)
                  </div>
                  <div className="flex gap-4 bg-surface-100 p-2 rounded">
                    <div className="bg-brand-500 h-6 w-8 rounded-sm"></div>
                    <div className="bg-brand-500 h-6 w-8 rounded-sm"></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm text-surface-500 text-right mr-4">
                    gap-6 (24px)
                  </div>
                  <div className="flex gap-6 bg-surface-100 p-2 rounded">
                    <div className="bg-brand-500 h-6 w-8 rounded-sm"></div>
                    <div className="bg-brand-500 h-6 w-8 rounded-sm"></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm text-surface-500 text-right mr-4">
                    gap-8 (32px)
                  </div>
                  <div className="flex gap-8 bg-surface-100 p-2 rounded">
                    <div className="bg-brand-500 h-6 w-8 rounded-sm"></div>
                    <div className="bg-brand-500 h-6 w-8 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Colors */}
        <section>
          <div className="border-b border-surface-200 pb-4 mb-8">
            <h2 className="text-3xl font-heading font-bold text-brand-900">
              Color Palette
            </h2>
            <p className="text-surface-800 mt-2">
              Brand, Surface, and Accent scales.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Colors */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-lg text-surface-900">
                Brand (Indigo)
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="h-12 rounded-lg bg-brand-50 flex items-center px-4">
                  <span className="text-brand-900 font-medium text-sm">
                    Brand 50
                  </span>
                </div>
                <div className="h-12 rounded-lg bg-brand-100 flex items-center px-4">
                  <span className="text-brand-900 font-medium text-sm">
                    Brand 100
                  </span>
                </div>
                <div className="h-12 rounded-lg bg-brand-500 flex items-center px-4">
                  <span className="text-white font-medium text-sm">
                    Brand 500 (Primary)
                  </span>
                </div>
                <div className="h-12 rounded-lg bg-brand-600 flex items-center px-4">
                  <span className="text-white font-medium text-sm">
                    Brand 600 (Hover)
                  </span>
                </div>
                <div className="h-12 rounded-lg bg-brand-900 flex items-center px-4">
                  <span className="text-white font-medium text-sm">
                    Brand 900 (Deep)
                  </span>
                </div>
              </div>
            </div>

            {/* Surface Colors */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-lg text-surface-900">
                Surface (Slate)
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="h-12 rounded-lg bg-surface-50 flex items-center px-4 border border-surface-200">
                  <span className="text-surface-900 font-medium text-sm">
                    Surface 50 (Bg)
                  </span>
                </div>
                <div className="h-12 rounded-lg bg-surface-100 flex items-center px-4 border border-surface-200">
                  <span className="text-surface-900 font-medium text-sm">
                    Surface 100
                  </span>
                </div>
                <div className="h-12 rounded-lg bg-surface-200 flex items-center px-4 border border-surface-200">
                  <span className="text-surface-900 font-medium text-sm">
                    Surface 200 (Borders)
                  </span>
                </div>
                <div className="h-12 rounded-lg bg-surface-800 flex items-center px-4">
                  <span className="text-surface-50 font-medium text-sm">
                    Surface 800
                  </span>
                </div>
                <div className="h-12 rounded-lg bg-surface-900 flex items-center px-4">
                  <span className="text-surface-50 font-medium text-sm">
                    Surface 900 (Text)
                  </span>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-lg text-surface-900">
                Accent (Rose)
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="h-12 rounded-lg bg-accent-50 flex items-center px-4 border border-accent-100">
                  <span className="text-accent-600 font-medium text-sm">
                    Accent 50
                  </span>
                </div>
                <div className="h-12 rounded-lg bg-accent-500 flex items-center px-4">
                  <span className="text-white font-medium text-sm">
                    Accent 500 (Sale/Warning)
                  </span>
                </div>
                <div className="h-12 rounded-lg bg-accent-600 flex items-center px-4">
                  <span className="text-white font-medium text-sm">
                    Accent 600
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Buttons & Interactions */}
        <section>
          <div className="border-b border-surface-200 pb-4 mb-8">
            <h2 className="text-3xl font-heading font-bold text-brand-900">
              Buttons & Interactions
            </h2>
            <p className="text-surface-800 mt-2">
              Call to action styles and hover effects.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center bg-white p-8 rounded-2xl shadow-soft">
            <button className="px-6 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-500 hover:shadow-glow transition-all duration-300 flex items-center gap-2">
              Primary Action <ArrowRight className="w-4 h-4" />
            </button>

            <button className="px-6 py-3 bg-surface-100 text-brand-900 font-medium rounded-xl hover:bg-surface-200 transition-colors">
              Secondary Button
            </button>

            <button className="px-6 py-3 border-2 border-brand-200 text-brand-600 font-medium rounded-xl hover:border-brand-600 hover:bg-brand-50 transition-colors">
              Outline Button
            </button>

            <button className="px-6 py-3 bg-accent-50 text-accent-600 font-medium rounded-xl hover:bg-accent-500 hover:text-white transition-all duration-300 flex items-center gap-2">
              <Tag className="w-4 h-4" /> Sale Alert
            </button>
          </div>
        </section>

        {/* Section 4: Status Colors & Alerts */}
        <section>
          <div className="border-b border-surface-200 pb-4 mb-8">
            <h2 className="text-3xl font-heading font-bold text-brand-900">
              Status & Alerts
            </h2>
            <p className="text-surface-800 mt-2">
              Semantic colors for success, warning, error, and info states.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Success */}
            <div className="bg-success-50 border border-success-500/20 p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-success-500 text-white p-2 rounded-full mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-success-600 mb-1">
                  Order Confirmed
                </h3>
                <p className="text-success-600/80 text-sm">
                  Your payment was successful and your order is being processed.
                </p>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 w-8 rounded bg-success-500"></div>
                  <div className="h-8 w-8 rounded bg-success-600"></div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-warning-50 border border-warning-500/20 p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-warning-500 text-white p-2 rounded-full mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-warning-600 mb-1">
                  Low Stock
                </h3>
                <p className="text-warning-600/80 text-sm">
                  Only 2 items left in stock. Order soon to guarantee
                  availability.
                </p>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 w-8 rounded bg-warning-500"></div>
                  <div className="h-8 w-8 rounded bg-warning-600"></div>
                </div>
              </div>
            </div>

            {/* Error */}
            <div className="bg-error-50 border border-error-500/20 p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-error-500 text-white p-2 rounded-full mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-error-600 mb-1">
                  Payment Failed
                </h3>
                <p className="text-error-600/80 text-sm">
                  We couldn't process your card. Please update your payment
                  method.
                </p>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 w-8 rounded bg-error-500"></div>
                  <div className="h-8 w-8 rounded bg-error-600"></div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-info-50 border border-info-500/20 p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-info-500 text-white p-2 rounded-full mt-0.5">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-info-600 mb-1">
                  Shipping Update
                </h3>
                <p className="text-info-600/80 text-sm">
                  Your package has been delayed by the carrier and will arrive
                  tomorrow.
                </p>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 w-8 rounded bg-info-500"></div>
                  <div className="h-8 w-8 rounded bg-info-600"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Cards & Shadows */}
        <section>
          <div className="border-b border-surface-200 pb-4 mb-8">
            <h2 className="text-3xl font-heading font-bold text-brand-900">
              Cards & Shadows
            </h2>
            <p className="text-surface-800 mt-2">
              Displaying products and content blocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard Product Card */}
            <div className="bg-white rounded-2xl p-4 shadow-soft hover:shadow-hover transition-shadow duration-300 border border-surface-100 flex flex-col group cursor-pointer">
              <div className="aspect-square bg-surface-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <span className="text-surface-400 font-medium">
                  Product Image Placeholder
                </span>
              </div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-surface-900 group-hover:text-brand-600 transition-colors">
                    Premium Headphones
                  </h3>
                  <div className="flex items-center text-sm text-surface-800 mt-1">
                    <Star className="w-4 h-4 text-accent-500 fill-accent-500 mr-1" />{" "}
                    4.9 (120 reviews)
                  </div>
                </div>
                <span className="bg-accent-50 text-accent-600 text-xs font-bold px-2 py-1 rounded-md">
                  SALE
                </span>
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-brand-900">
                    $299.00
                  </span>
                  <span className="text-sm text-surface-400 line-through ml-2">
                    $349.00
                  </span>
                </div>
                <button className="w-10 h-10 rounded-full bg-surface-100 text-brand-600 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Clean Flat Card */}
            <div className="bg-surface-50 rounded-2xl p-6 border border-surface-200 flex flex-col">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-4">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-surface-900 mb-2">
                Flat Design Box
              </h3>
              <p className="text-surface-800 text-sm mb-4">
                This is an example of a flat card with borders and background
                colors rather than shadows. Good for secondary information.
              </p>
              <a
                href="#"
                className="mt-auto text-brand-600 font-medium text-sm hover:underline flex items-center gap-1"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Featured / Highlight Card */}
            <div className="bg-brand-900 rounded-2xl p-8 shadow-soft flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-600 rounded-full opacity-20 blur-2xl"></div>
              <h3 className="font-heading font-bold text-2xl text-white mb-2 relative z-10">
                Exclusive Access
              </h3>
              <p className="text-brand-100 text-sm mb-6 relative z-10">
                Join our premium membership for early access to sales and
                exclusive products.
              </p>
              <button className="w-full py-3 bg-white text-brand-900 font-bold rounded-xl hover:bg-brand-50 transition-colors relative z-10">
                Join Now
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThemeDemo;
