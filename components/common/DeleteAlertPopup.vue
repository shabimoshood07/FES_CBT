<template>
  <ConfirmPopup />
  <div class="card flex flex-wrap gap-2 justify-center">
    <slot :confirm="showConfirm" />
  </div>
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const confirm = useConfirm();
const toast = useToast();

const showConfirm = (event, message, acceptLabel = 'Confirm', rejectLabel = 'Cancel', onAccept, onReject) => {
  confirm.require({
    target: event.currentTarget,
    message: message,
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: rejectLabel,
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: acceptLabel,
    },
    accept: () => {
      toast.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Action confirmed',
        life: 3000,
      });
      if (onAccept) onAccept();
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'Action rejected',
        life: 3000,
      });
      if (onReject) onReject();
    },
  });
};
</script>
