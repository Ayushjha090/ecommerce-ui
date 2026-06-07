export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  admin: {
    root: {
      path: "/admin",
      getHref: () => "/admin",
    },
    auth: {
      login: {
        path: "auth/login",
        getHref: (redirectTo?: string | null) =>
          `/admin/auth/login${
            redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
          }`,
      },
    },
    dashboard: {
      path: "dashboard",
      getHref: () => "/admin/dashboard",
    },
  },

  dev: {
    visualizer: {
      path: "/__visualizer",
      getHref: () => "/__visualizer",
    },
    themeDemo: {
      path: "/theme-demo",
      getHref: () => "/theme-demo",
    },
    internalServerError: {
      path: "/test-500",
      getHref: () => "/test-500",
    },
    unauthenticated: {
      path: "/test-401",
      getHref: () => "/test-401",
    },
    unauthorized: {
      path: "/test-403",
      getHref: () => "/test-403",
    },
    maintenance: {
      path: "/test-maintenance",
      getHref: () => "/test-maintenance",
    },
    workInProgress: {
      path: "/test-wip",
      getHref: () => "/test-wip",
    },
  },

  errors: {
    unauthenticated: {
      path: "/unauthenticated",
      getHref: (from?: string | null) =>
        `/unauthenticated${from ? `?from=${encodeURIComponent(from)}` : ""}`,
    },
    unauthorized: {
      path: "/unauthorized",
      getHref: (from?: string | null) =>
        `/unauthorized${from ? `?from=${encodeURIComponent(from)}` : ""}`,
    },
  },

  notFound: {
    path: "*",
    getHref: () => "*",
  },
} as const;
