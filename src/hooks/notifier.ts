import { NotificationType } from "@/interfaces/INotication";
import { store } from "@/store";
import { NOTIFY } from "@/store/type-mutations";

type Notifier = {
  notify: (title: string, text: string, type: NotificationType) => void;
};

export default (): Notifier => {
  const notify = (
    title: string,
    text: string,
    type: NotificationType
  ): void => {
    store.commit(NOTIFY, {
      title,
      text,
      type,
    });
  };

  return {
    notify,
  };
};
