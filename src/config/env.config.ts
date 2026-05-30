import * as z from "zod";

const EnvSchema = z.object({
  API_URL: z.url().default("http://localhost:8080/api/v1"),
  APP_URL: z.url().default("http://localhost:5173"),
  TEMPLATE_NAME: z.string().default("Ecommerce App"),
  LOGO_URL: z.string().default("/shopping-cart.svg"),
  API_TIMEOUT_MS: z.coerce.number().default(1000*10),
  REACT_QUERY_STALE_TIME_MS: z.coerce.number().default(1000 * 60),
});

const createEnv = () => {
  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    if (key.startsWith("VITE_")) {
      acc[key.replace("VITE_", "")] = String(value);
    }

    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    const fieldErrors = z.flattenError(parsedEnv.error).fieldErrors;

    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(fieldErrors)
  .map(([key, value]) => `- ${key}: ${value?.join(", ")}`)
  .join("\n")}
`,
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
