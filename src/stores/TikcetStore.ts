export const useTicketStore = defineStore("ticket", () => {
  const item = ref({});

  const isEdit = ref(false);

  const addDialogOpen = ref(false);
  const reopenTicketDialog = ref(false);
  const reopenId = ref(null);

  const setDialog = (value: any) => {
    addDialogOpen.value = value;
  };

  const setItem = (value: any) => {
    addDialogOpen.value = value;
  };
  const reopenTicket = (id: any) => {
    reopenTicketDialog.value = true;
    reopenId.value = id;
  };

  return {
    item,
    addDialogOpen,
    setDialog,
    setItem,
    reopenTicket,
    reopenTicketDialog,
    reopenId,
  };
});
