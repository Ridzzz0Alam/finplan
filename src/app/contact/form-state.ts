export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"name" | "email" | "service" | "message", string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
};
