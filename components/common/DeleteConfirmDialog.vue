<!-- <template>
  <Toast />
  <ConfirmDialog />
  <div class="card flex flex-wrap gap-2 justify-center">
    <Button
      label="Delete"
      severity="danger"
      icon="pi pi-trash"
      @click="confirmDelete()"
    />
  </div>
</template>

<script setup>
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const confirm = useConfirm();
const toast = useToast();

const confirmDelete = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Save',
    },
    accept: () => {
      toast.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'You have accepted',
        life: 3000,
      });
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'You have rejected',
        life: 3000,
      });
    },
  });
};
</script> -->

<template>
  <ConfirmDialog />
  <div class="card flex flex-wrap gap-2 justify-center">
    <Button
      :label="buttonLabel"
      severity="danger"
      icon="pi pi-trash"
      @click="confirmDelete"
    />
    <!-- :aria-expanded="isVisible"
      :aria-controls="isVisible ? 'confirm' : undefined" -->
  </div>
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { defineProps, defineEmits } from 'vue';

const confirm = useConfirm();
const toast = useToast();
const isVisible = ref(true);

// Define props for customization
const props = defineProps({
  successMessage: {
    type: String,
    default: 'Are you sure you want to proceed?',
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?',
  },
  header: {
    type: String,
    default: 'Confirmation',
  },
  buttonLabel: {
    type: String,
    default: 'Delete',
  },
  acceptLabel: {
    type: String,
    default: 'Yes',
  },
  rejectLabel: {
    type: String,
    default: 'No',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  deleteFn: {
    type: Function,
    default: async () => {},
  },
  contentId: {
    type: [String, Number],
    default: '',
  },
});

// Define emits for handling accept/reject actions
const emit = defineEmits(['accept', 'reject']);

const handleDelete = async () => {
  const response = await props.deleteFn(props.contentId);
  if (response.error) {
    return toast.add({
      severity: 'danger',
      summary: 'Error',
      detail: response.message,
      life: 5000,
    });
  }
  toast.add({
    severity: 'info',
    summary: 'Success',
    detail: response.message,
    life: 5000,
  });
};
const isLoading = ref(false);

const confirmDelete = () => {
  confirm.require({
    message: props.message,
    header: props.header,
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: props.rejectLabel,
      severity: 'secondary',
      //   disabled: props.loading,
      diabled: isLoading.value,
    },
    acceptProps: {
      severity: 'danger',
      label: props.acceptLabel,
      //   loading: props.loading,
      loading: isLoading.value,
      acceptVisible: isVisible.value,
    },
    // accept: handleDelete,
    accept: async () => {
      //   emit('accept');
      isLoading.value = true;
      await props.deleteFn();
      console.log('1');
      toast.add({
        severity: 'info',
        summary: 'Success',
        detail: 'Accepted',
        life: 5000,
      });
      console.log('2');
      isLoading.value = false;
    },
    // reject: () => {
    //   toast.add({
    //     severity: 'error',
    //     summary: 'Rejected',
    //     detail: 'You have rejected',
    //     life: 3000,
    //   });
    //   emit('reject');
    // },
    onShow: () => {
      //   isVisible.value = true;
      console.log('show');
    },
    onHide: () => {
      console.log('hide');
      //   isVisible.value = false;
    },
  });
};
</script>
