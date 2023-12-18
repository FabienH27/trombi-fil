<script lang="ts">
import TopBar from './components/TopBar.vue';
import PromoSelector from './components/PromoSelector.vue';
import StudentCard from './components/StudentCard.vue';
import type { StudentInfo } from './interfaces/StudentInfo';
import { students } from '@/assets/students';
import StudentForm from './components/StudentForm.vue';
import { defineComponent, ref } from 'vue';

const promoChoices = [2024, 2025, 2026];

const repeat = (arr: any, n: any) => Array(n).fill(arr).flat();

let studentList: StudentInfo[] = students;

studentList = repeat(studentList, 5);

const modalActive = ref(false);


export default defineComponent({
  components: {
    TopBar, StudentForm, PromoSelector, StudentCard
  },
  data() {
    return {
      studentList,
      promoChoices,
      modalActive
    }
  },
  methods: {
    toggleModal() {
      modalActive.value = !modalActive.value;
    }
  },
});

</script>

<template>
  <TopBar @open-modal="toggleModal" />

  <main>
    <section class="container">
      <h1 class="title">Les étudiants</h1>
      <PromoSelector :promo-choices="promoChoices" />
    </section>

    <section class="container student-wrapper">
      <StudentCard :student="student" v-for="(student, index) in studentList" :key="index" />
    </section>

    <Transition name="fade">
      <StudentForm :is-active="modalActive" @close-modal="toggleModal" />
    </Transition>

  </main>
</template>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.container {
  margin-top: 40px;
  font-size: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &.student-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 1280px;

    overflow-y: scroll;
    height: calc(100vh - 107px - 75px - 90px);


    /* width */
    &::-webkit-scrollbar {
      width: 10px;
      cursor: pointer;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: var(--bg-color-darker);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background-clip: padding-box;
      background: var(--primary-dark-color);
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: var(--primary-color);
    }

  }

  & .title {
    font-size: 40px;
  }

}
</style>./interfaces/StudentInfo