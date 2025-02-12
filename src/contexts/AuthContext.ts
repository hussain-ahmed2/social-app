import { AuthContextType } from "@/types";
import { createContext } from "react";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;