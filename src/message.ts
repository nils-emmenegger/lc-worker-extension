export interface Message {
  type: "FROM_LC_WORKER_EXTENSION";
  streak: number;
}

export function toMessage(x: any): Message | null {
  if (
    x &&
    x.type === "FROM_LC_WORKER_EXTENSION" &&
    typeof x.streak === "number"
  )
    return x as Message;
  else return null;
}
