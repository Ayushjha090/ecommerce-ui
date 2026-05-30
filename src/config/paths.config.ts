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
    themeDemo: {
      path: "/theme-demo",
      getHref: () => "/theme-demo",
    },
    internalServerError: {
      path: "/test-500",
      getHref: () => "/test-500",
    },
    unauthorized: {
      path: "/test-401",
      getHref: () => "/test-401",
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

  notFound: {
    path: "*",
    getHref: () => "*",
  },
} as const;
