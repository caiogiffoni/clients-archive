import { ClientsProvider } from "./clients";
import { TokenProvider } from "./token";
import { UserProvider } from "./username";

export const Providers = ({ children }: any) => {
  return (
    <UserProvider>
      <TokenProvider>
        <ClientsProvider>{children}</ClientsProvider>
      </TokenProvider>
    </UserProvider>
  );
};
