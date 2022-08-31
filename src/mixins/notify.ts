import { NotificationType } from "@/interfaces/INotication";
import { store } from "@/store";
import { NOTIFY } from "@/store/type-mutations";

export const notificationMixin = {
  methods: {
    notify(title: string, text: string, type: NotificationType): void {
      store.commit(NOTIFY, {
        title,
        text,
        type,
      });
    },
  },
};
