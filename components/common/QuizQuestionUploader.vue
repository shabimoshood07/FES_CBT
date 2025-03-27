<template>
  <section class="space-y-10">
    <div class="w-full">
      <FileUpload
        ref="fileUploader"
        mode="advanced"
        name="quiz-file"
        accept=".xlsx, .xls, .xlsm"
        :max-file-size="1000000"
        choose-label="Choose excel file"
        cancel-label=""
        invalid-file-type-message="Invalid file type, use the template provided"
        :show-upload-button="false"
        :show-cancel-button="false"
        :disabled="populatedQuestions.length > 0"
        @select="handleFileSelect"
        @clear="handleClear"
        @remove="handleClear"
      >
        <template #header="{ chooseCallback, clearCallback, files }">
          <div class="flex flex-col gap-4 w-full">
            <h2 class="section-heading">Upload Quiz Questions</h2>

            <div class="flex justify-between items-start gap-2 w-full">
              <div class="flex gap-4 flex-wrap">
                <Button
                  label="Choose file"
                  icon="pi pi-file"
                  @click="chooseCallback()"
                />
                <Button
                  icon="pi pi-times"
                  rounded
                  outlined
                  severity="danger"
                  :disabled="!files || files.length === 0"
                  @click="clearCallback()"
                />
              </div>

              <Button
                icon="pi pi-question"
                label="Help"
                icon-pos="right"
                outlined
                severity="help"
              />
            </div>
          </div>
        </template>
      </FileUpload>
    </div>
    <!-- Populated questions conatiner -->
    <PopulatedQuizQuestions @remove-file="removeFile" />
  </section>
</template>
<script setup lang="ts">
import { useQuizUploadStore } from '~/store/quiz-upload';
import PopulatedQuizQuestions from './PopulatedQuizQuestions.vue';

// Ref
const fileUploader = ref();

const removeFile = () => fileUploader.value.clear();
// Store
const { populatedQuestions } = storeToRefs(useQuizUploadStore());
const { handleClear, handleFileSelect } = useQuizUploadStore();
</script>
