import {
  QueryClient,
  type DefaultOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";

import { appConfig } from "../../config";

type AsyncFn = (...args: never[]) => Promise<unknown>;
type QueryOptionsFn = (...args: never[]) => object;

type FirstParameter<TFn extends AsyncFn> = Parameters<TFn> extends [
  infer TPayload,
  ...unknown[],
]
  ? TPayload
  : void;

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: appConfig.reactQueryStaleTimeMs,
  },
} satisfies DefaultOptions;

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export type ApiFnReturnType<TFn extends AsyncFn> = Awaited<ReturnType<TFn>>;

export type QueryConfig<TQueryOptionsFn extends QueryOptionsFn> = Omit<
  ReturnType<TQueryOptionsFn>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<TMutationFn extends AsyncFn> = UseMutationOptions<
  ApiFnReturnType<TMutationFn>,
  Error,
  FirstParameter<TMutationFn>
>;
