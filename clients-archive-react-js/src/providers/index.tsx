import { TokenProvider } from "./token";
import { UserProvider } from "./username";

export const Providers = ({ children }: any) => {
  return (
    <UserProvider>
      <TokenProvider>{children}</TokenProvider>;
    </UserProvider>
  );
};
