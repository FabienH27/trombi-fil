<script lang="ts">
import TopBar from './components/TopBar.vue';
import PromoSelector from './components/PromoSelector.vue';
import StudentCard from './components/StudentCard.vue';
import type { StudentInfo } from './interfaces/StudentInfo';
import StudentForm from './components/StudentForm.vue';
import { defineComponent, isProxy, ref, toRaw, type Ref } from 'vue';

const promoChoices = [2024, 2025, 2026];

let studentList: Ref<StudentInfo[]> = ref([]);

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
  mounted() {
    this.fetchStudents();
  },
  methods: {
    toggleModal() {
      modalActive.value = !modalActive.value;
    },
    addStudent(student: any) {
      if (isProxy(student)) {
        const rawStudent = toRaw(student);
        studentList.value.unshift(rawStudent);
      }
    },
    async fetchStudents() {
      try {
        const response = await fetch('http://localhost:3000/students');
        const data = await response.json()
        studentList.value = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
      <p v-if="!studentList.length">Aucun étudiant trouvé.</p>
      <StudentCard :student="student" v-for="(student, index) in studentList" :key="index" />
    </section>

    <Transition name="fade">
      <StudentForm :is-active="modalActive" @close-modal="toggleModal" @submit="addStudent" />
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


  & :not(.student-wrapper) {
    align-items: center;
  }

  &.student-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 1280px;

    overflow-y: auto;
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