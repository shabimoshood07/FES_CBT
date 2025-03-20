<template>
  <section>
    <div class="flex gap-4 md:items-center flex-col md:flex-row flex-wrap">
      <NuxtLink
        v-for="item in data"
        :key="item.id"
        :href="item.href"
      >
        <Card
          class="bg-Primary_Variation border border-Neutral_Gray rounded-md shadow hover:bg-primary transition-colors duration-200 md:w-[300px]"
        >
          <template #title>
            <div class="flex gap-4 items-center justify-center">
              <i
                :class="item.icon"
                class="text-xl text-secondary"
              />
              <h3 class="text-lg text-Dark_Text font-semibold">
                {{ item.title }}
              </h3>
            </div>
          </template>
          <template #content>
            <!-- COURSES -->
            <div
              v-if="item.title === 'Assigned Courses'"
              class="text-center"
            >
              <Button
                v-if="countStatus === 'pending'"
                :loading="item.status === 'pending'"
                icon="pi pi-refresh"
              />

              <p
                v-else
                class="text-4xl font-bold text-secondary"
              >
                {{ courseCount }}
              </p>
              <p class="text-sm text-Dark_Text mt-2">{{ item.description }}</p>
            </div>
            <!-- QUIZZES -->
            <div
              v-if="item.title === 'Quizzes'"
              class="text-center"
            >
              <Button
                v-if="quizStatus === 'pending'"
                :loading="item.status === 'pending'"
                icon="pi pi-refresh"
              />

              <p
                v-else
                class="text-4xl font-bold text-secondary"
              >
                {{ quizCount ?? 0 }}
              </p>
              <p class="text-sm text-Dark_Text mt-2">{{ item.description }}</p>
            </div>
            <!-- STUDENTS -->
            <div
              v-if="item.title === 'Students'"
              class="text-center"
            >
              <Button
                v-if="quizStatus === 'pending'"
                :loading="item.status === 'pending'"
                icon="pi pi-refresh"
              />

              <p
                v-else
                class="text-4xl font-bold text-secondary"
              >
                100
              </p>
              <p class="text-sm text-Dark_Text mt-2">{{ item.description }}</p>
            </div>
          </template>
        </Card>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PrimeIcons } from '@primevue/core/api';
const { courseCount, status: countStatus } = useGetCourseCount();
const { quizCount, status: quizStatus } = useGetQuizCount();

const data = reactive([
  {
    id: 1,
    title: 'Assigned Courses',
    description: 'Total Courses',
    icon: PrimeIcons.BOOK,
    href: '/',
    status: countStatus.value,
  },
  {
    id: 2,
    title: 'Quizzes',
    description: 'Total Quizzes',
    icon: PrimeIcons.DESKTOP,
    href: '/lecturer/quiz',
    status: quizStatus.value,
  },
  {
    id: 3,
    title: 'Students',
    description: 'Total students',
    icon: PrimeIcons.USERS,
    href: '/',
    status: 'pending',
  },
]);
</script>
