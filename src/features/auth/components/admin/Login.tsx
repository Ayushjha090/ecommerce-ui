import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useNavigate } from "react-router";

import { paths, themeConfig } from "../../../../config";
import { Button } from "../../../../components/ui/Button";
import { Tooltip } from "../../../../components/ui/Tooltip";
import { Field } from "../../../../components/ui/form/Field";

import {
  adminLoginSchema,
  type LoginFormValues,
} from "../../schema/admin/login.schema";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { setAccessToken } from "@/lib/storage/tokenStorage";
import { queryClient } from "@/lib/react-query/react-query";
import { adminAuthKeys } from "../../api/adminAuth.keys";

const Login: FC = () => {
  const { logoUrl, templateName } = themeConfig;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const redirectTo =
    searchParams.get("redirectTo") || paths.admin.dashboard.getHref();

  const { login } = useAdminAuth();
  const { error, isError, isLoading, login: loginFunc } = login;
  const onSubmit = (data: LoginFormValues) => {
    loginFunc(data, {
      onSuccess: (loginResult) => {
        setAccessToken("admin", loginResult.token);

        queryClient.setQueryData(adminAuthKeys.me(), loginResult.user);

        navigate(redirectTo, {
          replace: true,
        });
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-surface-900 bg-surface-200">
      <div className="w-sm md:w-md lg:w-lg flex flex-col items-center justify-center dark:bg-surface-800 bg-surface-50 p-4 rounded-lg shadow-soft">
        <div className="flex items-center justify-center">
          <img src={logoUrl} alt="ecommerce-logo" className="w-10 h-10 mr-2" />
          <h1 className="text-2xl font-bold text-brand-600 dark:text-brand-50">
            {templateName} Admin
          </h1>
        </div>
        <div className="w-full my-5">
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 px-5"
          >
            <Field
              label="Email"
              type="email"
              placeholder="Email"
              error={errors.email?.message}
              {...register("email")}
            />

            <Field
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              error={errors.password?.message}
              endAdornment={
                <Tooltip
                  content={showPassword ? "Hide password" : "Show password"}
                  side="top"
                >
                  <span
                    className="flex items-center cursor-pointer text-surface-900 dark:text-surface-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors focus:outline-none"
                    onClick={() => setShowPassword((prev) => !prev)}
                    onMouseDown={(e) => e.preventDefault()}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeClosed className="w-5 h-5" />
                    )}
                  </span>
                </Tooltip>
              }
              {...register("password")}
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isSubmitting || isLoading}
              className="rounded-full text-xl cursor-pointer"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? "Logging in…" : "Login"}
            </Button>

            {isError ? (
              <p className="text-sm text-red-600 dark:text-red-400">
                {error?.message || "Unable to login. Please try again."}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
