<template>
  <div class="card flex justify-center">
    <Button
      :label="buttonLabel"
      severity="danger"
      icon="pi pi-trash"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      modal
      :header="header"
      :style="{ width: '25rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8">{{
        message
      }}</span>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          :label="rejectLabel"
          severity="secondary"
          :disabled="isLoading"
          @click="visible = false"
        />
        <Button
          type="button"
          severity="danger"
          :label="acceptLabel"
          :loading="isLoading"
          @click="handleDelete"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const visible = ref(false);
const isLoading = ref(false);
const toast = useToast();

const emit = defineEmits(['delete-success', 'confirm-success']);

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  buttonLabel: {
    type: String,
    required: true,
  },
  acceptLabel: {
    type: String,
    required: true,
  },
  rejectLabel: {
    type: String,
    required: true,
  },
  onConfirm: {
    type: Function,
    required: true,
  },
});

const handleDelete = async () => {
  try {
    isLoading.value = true;
    const response = await props.onConfirm();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: response.message,
      life: 5000,
    });
    visible.value = false;
    emit('confirm-success');
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message || 'An unexpected error occurred.',
      life: 5000,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
