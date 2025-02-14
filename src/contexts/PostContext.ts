import { PostContextType } from "@/types";
import { createContext } from "react";

const PostContext = createContext<PostContextType>({} as PostContextType);

export default PostContext;