/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const VerifyOtpLazyImport = createFileRoute('/verify-otp')()
const ResetPasswordLazyImport = createFileRoute('/reset-password')()
const RegisterLazyImport = createFileRoute('/register')()
const ProfileLazyImport = createFileRoute('/profile')()
const NotificationLazyImport = createFileRoute('/notification')()
const LoginLazyImport = createFileRoute('/login')()
const ForgotPasswordLazyImport = createFileRoute('/forgot-password')()
const AboutUsLazyImport = createFileRoute('/about-us')()
const IndexLazyImport = createFileRoute('/')()
const TicketsIndexLazyImport = createFileRoute('/tickets/')()
const PaymentIndexLazyImport = createFileRoute('/payment/')()
const HistoryIndexLazyImport = createFileRoute('/history/')()
const CheckoutIndexLazyImport = createFileRoute('/checkout/')()
const PaymentSuccessLazyImport = createFileRoute('/payment/success')()
const CheckoutCompletedLazyImport = createFileRoute('/checkout/completed')()

// Create/Update Routes

const VerifyOtpLazyRoute = VerifyOtpLazyImport.update({
  id: '/verify-otp',
  path: '/verify-otp',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/verify-otp.lazy').then((d) => d.Route))

const ResetPasswordLazyRoute = ResetPasswordLazyImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/reset-password.lazy').then((d) => d.Route),
)

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const ProfileLazyRoute = ProfileLazyImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile.lazy').then((d) => d.Route))

const NotificationLazyRoute = NotificationLazyImport.update({
  id: '/notification',
  path: '/notification',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/notification.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const ForgotPasswordLazyRoute = ForgotPasswordLazyImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/forgot-password.lazy').then((d) => d.Route),
)

const AboutUsLazyRoute = AboutUsLazyImport.update({
  id: '/about-us',
  path: '/about-us',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about-us.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TicketsIndexLazyRoute = TicketsIndexLazyImport.update({
  id: '/tickets/',
  path: '/tickets/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/tickets/index.lazy').then((d) => d.Route))

const PaymentIndexLazyRoute = PaymentIndexLazyImport.update({
  id: '/payment/',
  path: '/payment/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/payment/index.lazy').then((d) => d.Route))

const HistoryIndexLazyRoute = HistoryIndexLazyImport.update({
  id: '/history/',
  path: '/history/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/history/index.lazy').then((d) => d.Route))

const CheckoutIndexLazyRoute = CheckoutIndexLazyImport.update({
  id: '/checkout/',
  path: '/checkout/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/checkout/index.lazy').then((d) => d.Route),
)

const PaymentSuccessLazyRoute = PaymentSuccessLazyImport.update({
  id: '/payment/success',
  path: '/payment/success',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/payment/success.lazy').then((d) => d.Route),
)

const CheckoutCompletedLazyRoute = CheckoutCompletedLazyImport.update({
  id: '/checkout/completed',
  path: '/checkout/completed',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/checkout/completed.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about-us': {
      id: '/about-us'
      path: '/about-us'
      fullPath: '/about-us'
      preLoaderRoute: typeof AboutUsLazyImport
      parentRoute: typeof rootRoute
    }
    '/forgot-password': {
      id: '/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof ForgotPasswordLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/notification': {
      id: '/notification'
      path: '/notification'
      fullPath: '/notification'
      preLoaderRoute: typeof NotificationLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordLazyImport
      parentRoute: typeof rootRoute
    }
    '/verify-otp': {
      id: '/verify-otp'
      path: '/verify-otp'
      fullPath: '/verify-otp'
      preLoaderRoute: typeof VerifyOtpLazyImport
      parentRoute: typeof rootRoute
    }
    '/checkout/completed': {
      id: '/checkout/completed'
      path: '/checkout/completed'
      fullPath: '/checkout/completed'
      preLoaderRoute: typeof CheckoutCompletedLazyImport
      parentRoute: typeof rootRoute
    }
    '/payment/success': {
      id: '/payment/success'
      path: '/payment/success'
      fullPath: '/payment/success'
      preLoaderRoute: typeof PaymentSuccessLazyImport
      parentRoute: typeof rootRoute
    }
    '/checkout/': {
      id: '/checkout/'
      path: '/checkout'
      fullPath: '/checkout'
      preLoaderRoute: typeof CheckoutIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/history/': {
      id: '/history/'
      path: '/history'
      fullPath: '/history'
      preLoaderRoute: typeof HistoryIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/payment/': {
      id: '/payment/'
      path: '/payment'
      fullPath: '/payment'
      preLoaderRoute: typeof PaymentIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/tickets/': {
      id: '/tickets/'
      path: '/tickets'
      fullPath: '/tickets'
      preLoaderRoute: typeof TicketsIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/about-us': typeof AboutUsLazyRoute
  '/forgot-password': typeof ForgotPasswordLazyRoute
  '/login': typeof LoginLazyRoute
  '/notification': typeof NotificationLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/verify-otp': typeof VerifyOtpLazyRoute
  '/checkout/completed': typeof CheckoutCompletedLazyRoute
  '/payment/success': typeof PaymentSuccessLazyRoute
  '/checkout': typeof CheckoutIndexLazyRoute
  '/history': typeof HistoryIndexLazyRoute
  '/payment': typeof PaymentIndexLazyRoute
  '/tickets': typeof TicketsIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/about-us': typeof AboutUsLazyRoute
  '/forgot-password': typeof ForgotPasswordLazyRoute
  '/login': typeof LoginLazyRoute
  '/notification': typeof NotificationLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/verify-otp': typeof VerifyOtpLazyRoute
  '/checkout/completed': typeof CheckoutCompletedLazyRoute
  '/payment/success': typeof PaymentSuccessLazyRoute
  '/checkout': typeof CheckoutIndexLazyRoute
  '/history': typeof HistoryIndexLazyRoute
  '/payment': typeof PaymentIndexLazyRoute
  '/tickets': typeof TicketsIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/about-us': typeof AboutUsLazyRoute
  '/forgot-password': typeof ForgotPasswordLazyRoute
  '/login': typeof LoginLazyRoute
  '/notification': typeof NotificationLazyRoute
  '/profile': typeof ProfileLazyRoute
  '/register': typeof RegisterLazyRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/verify-otp': typeof VerifyOtpLazyRoute
  '/checkout/completed': typeof CheckoutCompletedLazyRoute
  '/payment/success': typeof PaymentSuccessLazyRoute
  '/checkout/': typeof CheckoutIndexLazyRoute
  '/history/': typeof HistoryIndexLazyRoute
  '/payment/': typeof PaymentIndexLazyRoute
  '/tickets/': typeof TicketsIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about-us'
    | '/forgot-password'
    | '/login'
    | '/notification'
    | '/profile'
    | '/register'
    | '/reset-password'
    | '/verify-otp'
    | '/checkout/completed'
    | '/payment/success'
    | '/checkout'
    | '/history'
    | '/payment'
    | '/tickets'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about-us'
    | '/forgot-password'
    | '/login'
    | '/notification'
    | '/profile'
    | '/register'
    | '/reset-password'
    | '/verify-otp'
    | '/checkout/completed'
    | '/payment/success'
    | '/checkout'
    | '/history'
    | '/payment'
    | '/tickets'
  id:
    | '__root__'
    | '/'
    | '/about-us'
    | '/forgot-password'
    | '/login'
    | '/notification'
    | '/profile'
    | '/register'
    | '/reset-password'
    | '/verify-otp'
    | '/checkout/completed'
    | '/payment/success'
    | '/checkout/'
    | '/history/'
    | '/payment/'
    | '/tickets/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AboutUsLazyRoute: typeof AboutUsLazyRoute
  ForgotPasswordLazyRoute: typeof ForgotPasswordLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  NotificationLazyRoute: typeof NotificationLazyRoute
  ProfileLazyRoute: typeof ProfileLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  ResetPasswordLazyRoute: typeof ResetPasswordLazyRoute
  VerifyOtpLazyRoute: typeof VerifyOtpLazyRoute
  CheckoutCompletedLazyRoute: typeof CheckoutCompletedLazyRoute
  PaymentSuccessLazyRoute: typeof PaymentSuccessLazyRoute
  CheckoutIndexLazyRoute: typeof CheckoutIndexLazyRoute
  HistoryIndexLazyRoute: typeof HistoryIndexLazyRoute
  PaymentIndexLazyRoute: typeof PaymentIndexLazyRoute
  TicketsIndexLazyRoute: typeof TicketsIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AboutUsLazyRoute: AboutUsLazyRoute,
  ForgotPasswordLazyRoute: ForgotPasswordLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  NotificationLazyRoute: NotificationLazyRoute,
  ProfileLazyRoute: ProfileLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  ResetPasswordLazyRoute: ResetPasswordLazyRoute,
  VerifyOtpLazyRoute: VerifyOtpLazyRoute,
  CheckoutCompletedLazyRoute: CheckoutCompletedLazyRoute,
  PaymentSuccessLazyRoute: PaymentSuccessLazyRoute,
  CheckoutIndexLazyRoute: CheckoutIndexLazyRoute,
  HistoryIndexLazyRoute: HistoryIndexLazyRoute,
  PaymentIndexLazyRoute: PaymentIndexLazyRoute,
  TicketsIndexLazyRoute: TicketsIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/about-us",
        "/forgot-password",
        "/login",
        "/notification",
        "/profile",
        "/register",
        "/reset-password",
        "/verify-otp",
        "/checkout/completed",
        "/payment/success",
        "/checkout/",
        "/history/",
        "/payment/",
        "/tickets/"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/about-us": {
      "filePath": "about-us.lazy.jsx"
    },
    "/forgot-password": {
      "filePath": "forgot-password.lazy.jsx"
    },
    "/login": {
      "filePath": "login.lazy.jsx"
    },
    "/notification": {
      "filePath": "notification.lazy.jsx"
    },
    "/profile": {
      "filePath": "profile.lazy.jsx"
    },
    "/register": {
      "filePath": "register.lazy.jsx"
    },
    "/reset-password": {
      "filePath": "reset-password.lazy.jsx"
    },
    "/verify-otp": {
      "filePath": "verify-otp.lazy.jsx"
    },
    "/checkout/completed": {
      "filePath": "checkout/completed.lazy.jsx"
    },
    "/payment/success": {
      "filePath": "payment/success.lazy.jsx"
    },
    "/checkout/": {
      "filePath": "checkout/index.lazy.jsx"
    },
    "/history/": {
      "filePath": "history/index.lazy.jsx"
    },
    "/payment/": {
      "filePath": "payment/index.lazy.jsx"
    },
    "/tickets/": {
      "filePath": "tickets/index.lazy.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
