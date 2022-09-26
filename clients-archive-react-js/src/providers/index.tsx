import { ClientsProvider } from "./clients";
import { ContactContext, ContactProvider } from "./contact";
import { TokenProvider } from "./token";
import { UserProvider } from "./username";

export const Providers = ({ children }: any) => {
  return (
    <UserProvider>
      <TokenProvider>
        <ClientsProvider>
          <ContactProvider>{children}</ContactProvider>
        </ClientsProvider>
      </TokenProvider>
    </UserProvider>
  );
};
