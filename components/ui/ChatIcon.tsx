import { chatLink } from "@/data/company";
import { MessengerIcon, WhatsAppIcon } from "./BrandIcons";

/** Shows the WhatsApp icon once a number is configured, otherwise Messenger. */
export function ChatIcon({ className }: { className?: string }) {
  return chatLink().channel === "whatsapp" ? <WhatsAppIcon className={className} /> : <MessengerIcon className={className} />;
}
