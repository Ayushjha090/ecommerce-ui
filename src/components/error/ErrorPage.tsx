import { motion, type Variants } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";
import { ArrowRight, Home, ShoppingBag, type LucideIcon } from "lucide-react";

export interface ErrorPageProps {
  code?: string | number;
  title: string;
  message: string;
  icon?: LucideIcon;
  intent?: "brand" | "error" | "warning" | "info" | "accent";
  primaryAction?: {
    label: string;
    to: string;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    to: string;
    icon?: LucideIcon;
  };
  showProducts?: boolean;
}

export default function ErrorPage({
  code,
  title,
  message,
  icon: Icon = ShoppingBag,
  intent = "brand",
  primaryAction = { label: "Back to Home", to: "/", icon: Home },
  secondaryAction = {
    label: "Continue Shopping",
    to: "/products",
    icon: ShoppingBag,
  },
  showProducts = false,
}: ErrorPageProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Colors based on intent
  const colors = {
    brand: {
      bg: "bg-brand-600",
      text: "text-brand-900",
      light: "bg-brand-100",
      lightHover: "hover:bg-brand-50",
      borderHover: "hover:border-brand-600",
    },
    error: {
      bg: "bg-error-600",
      text: "text-error-600",
      light: "bg-error-50",
      lightHover: "hover:bg-error-50",
      borderHover: "hover:border-error-600",
    },
    warning: {
      bg: "bg-warning-500",
      text: "text-warning-600",
      light: "bg-warning-50",
      lightHover: "hover:bg-warning-50",
      borderHover: "hover:border-warning-500",
    },
    info: {
      bg: "bg-info-500",
      text: "text-info-600",
      light: "bg-info-50",
      lightHover: "hover:bg-info-50",
      borderHover: "hover:border-info-500",
    },
    accent: {
      bg: "bg-accent-600",
      text: "text-accent-600",
      light: "bg-accent-50",
      lightHover: "hover:bg-accent-50",
      borderHover: "hover:border-accent-600",
    },
  };

  const theme = colors[intent];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const floatingBagVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    float: {
      y: [-12, 12, -12],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const productVariants: Variants = {
    hidden: { opacity: 0, scale: 0.6, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.3 + i * 0.12,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    float: (i: number) => ({
      y: [-15 - i * 5, 15 - i * 5, -15 - i * 5],
      x: [Math.cos(i) * 8, -Math.cos(i) * 8, Math.cos(i) * 8],
      transition: {
        duration: 6 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-surface-50 font-sans flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute -top-40 -right-40 w-80 h-80 ${theme.light} rounded-full opacity-50`}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-surface-200 rounded-full opacity-40"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <motion.div
        className="max-w-2xl w-full text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative h-64 sm:h-72 mb-8 flex items-center justify-center">
          <motion.div
            className="absolute"
            variants={floatingBagVariants}
            initial="hidden"
            animate={["visible", "float"]}
          >
            <motion.div
              className={`w-24 h-24 sm:w-32 sm:h-32 ${theme.bg} rounded-2xl flex items-center justify-center shadow-glow`}
              animate={
                intent === "error"
                  ? { x: [-5, 5, -5, 5, 0] }
                  : { rotateY: [0, -15, 0], rotateX: [0, 8, 0] }
              }
              transition={
                intent === "error"
                  ? { duration: 0.5, delay: 1 }
                  : { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <Icon
                className="w-12 h-12 sm:w-16 sm:h-16 text-white"
                strokeWidth={1.5}
              />
            </motion.div>
          </motion.div>

          {showProducts &&
            [0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                custom={i}
                variants={productVariants}
                initial="hidden"
                animate={["visible", "float"]}
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + (i % 2) * 20}%`,
                }}
              >
                <motion.div
                  className="w-16 h-20 sm:w-20 sm:h-24 bg-white rounded-xl shadow-soft border border-surface-200 p-2 sm:p-3"
                  whileHover={{ scale: 1.1 }}
                >
                  <div
                    className={`w-full h-full rounded ${["bg-accent-500", "bg-success-500", "bg-brand-500"][i]}`}
                  />
                </motion.div>
              </motion.div>
            ))}
        </div>

        {code && (
          <motion.div className="mb-6" variants={itemVariants}>
            <h1
              className={`text-7xl sm:text-8xl md:text-9xl font-heading font-black ${theme.text} mb-4`}
            >
              {code}
            </h1>
            <motion.div
              className={`h-1 w-24 ${theme.bg} mx-auto rounded-full`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>
        )}

        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-surface-900 mb-4"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg text-surface-800 mb-8 leading-relaxed"
        >
          {message}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          {primaryAction && (
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link
                to={primaryAction.to}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 ${theme.bg} text-white font-medium rounded-xl shadow-soft hover:shadow-glow transition-all duration-300`}
              >
                {primaryAction.icon && (
                  <primaryAction.icon className="w-5 h-5" />
                )}
                {primaryAction.label}
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          )}

          {secondaryAction && (
            <motion.div
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={secondaryAction.to}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-surface-200 ${theme.text} font-medium rounded-xl ${theme.lightHover} ${theme.borderHover} transition-colors`}
              >
                {secondaryAction.icon && (
                  <secondaryAction.icon className="w-5 h-5" />
                )}
                {secondaryAction.label}
              </Link>
            </motion.div>
          )}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm text-surface-500 mt-8"
        >
          Need help?{" "}
          <Link
            to="/support"
            className={`${theme.text} font-medium hover:underline transition-all`}
          >
            Contact our support team
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
