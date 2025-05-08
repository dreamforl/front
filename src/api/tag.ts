import { zwFetch } from "@/lib/fetch";
import { Tag } from "@/types";

export const getTags = () => zwFetch<Tag[]>("/api/tag");
