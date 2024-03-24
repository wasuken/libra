import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./index.module.css";

const schema = z.object({
  email: z.string().min(1, { message: "emailは必須です" }),
  password: z.string().min(1, { message: "パスワードは必須です" }),
});

type LoginFormInputs = z.infer<typeof schema>;

interface IProps {
  handleParamSubmit: (email: string, password: string) => Promise<void>;
  errorMessage: string;
}

const LoginForm: React.FC = ({ handleParamSubmit, errorMessage }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // console.log(data);
    const { email, password } = data;
    await handleParamSubmit(email, password);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>ログイン</h2>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email")}
            className={styles.input}
          />
          {errors.email && (
            <div style={{ color: "red", textAlign: "center" }}>
              {errors.email.message}
            </div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            パスワード
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className={styles.input}
          />
          {errors.password && (
            <div style={{ color: "red", textAlign: "center" }}>
              {errors.password.message}
            </div>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          ログイン
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
